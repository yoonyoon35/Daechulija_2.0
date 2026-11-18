import { boardCategories, boardLimits, boardPageSize, type BoardCategory } from "../lib/board/types";

interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  first<T>(column?: string): Promise<T | null>;
  all<T>(): Promise<{ results: T[] }>;
  run(): Promise<unknown>;
}

interface D1Database {
  prepare(query: string): D1PreparedStatement;
}

interface R2ObjectBody {
  body: ReadableStream;
  httpMetadata?: { contentType?: string };
}

interface R2Bucket {
  put(key: string, value: ArrayBuffer, options?: { httpMetadata?: { contentType?: string } }): Promise<unknown>;
  get(key: string): Promise<R2ObjectBody | null>;
  delete(key: string): Promise<void>;
}

interface Env {
  DB: D1Database;
  FILES: R2Bucket;
}

type PostRow = {
  id: string;
  category: BoardCategory;
  title: string;
  author: string;
  content: string;
  created_at: string;
  view_count: number;
  attachment_count: number;
};

type AttachmentRow = {
  id: string;
  file_name: string;
  content_type: string;
  size: number;
};

const allowedOrigins = new Set([
  "https://daechulija.com",
  "https://www.daechulija.com",
  "http://localhost:3000",
  "http://localhost:3001",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:3001",
]);

const categories = new Set<string>(boardCategories.map((item) => item.id));

const worker = {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get("Origin");
    const cors = corsHeaders(origin);
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }

    const url = new URL(request.url);
    try {
      if (url.pathname === "/posts" && request.method === "GET") {
        return json(await listPosts(env, url), 200, cors);
      }
      if (url.pathname === "/posts" && request.method === "POST") {
        return json(await createPost(request, env), 201, cors);
      }
      const file = url.pathname.match(/^\/posts\/([0-9a-f-]{36})\/files\/([0-9a-f-]{36})$/i);
      if (file && request.method === "GET") {
        const download = await readFile(env, file[1], file[2]);
        if (!download) return json({ message: "파일을 찾을 수 없습니다." }, 404, cors);
        const headers = new Headers(cors);
        headers.set("Content-Type", download.contentType);
        headers.set("Content-Disposition", contentDisposition(download.fileName));
        headers.set("X-Content-Type-Options", "nosniff");
        return new Response(download.body, { status: 200, headers });
      }
      const detail = url.pathname.match(/^\/posts\/([0-9a-f-]{36})$/i);
      if (detail && request.method === "GET") {
        const post = await readPost(env, detail[1]);
        if (!post) return json({ message: "글을 찾을 수 없습니다." }, 404, cors);
        return json(post, 200, cors);
      }
      return json({ message: "요청한 주소를 찾을 수 없습니다." }, 404, cors);
    } catch (error) {
      if (error instanceof HttpError) return json({ message: error.message }, error.status, cors);
      console.error(error);
      return json({ message: "게시판을 처리하지 못했습니다. 잠시 후 다시 시도해 주세요." }, 500, cors);
    }
  },
};

export default worker;

async function listPosts(env: Env, url: URL) {
  const category = url.searchParams.get("category") ?? "all";
  const query = (url.searchParams.get("q") ?? "").trim();
  const page = parsePage(url.searchParams.get("page"));
  if (category !== "all" && !categories.has(category)) {
    throw new HttpError("분류가 올바르지 않습니다.", 400);
  }
  if (query.length > 100) {
    throw new HttpError("검색어는 100자 이하로 입력해 주세요.", 400);
  }

  const listFilter = buildFilter(category, query);
  const totalRow = await env.DB.prepare(`SELECT COUNT(*) AS count FROM posts ${listFilter.where}`)
    .bind(...listFilter.binds)
    .first<{ count: number }>();
  const total = totalRow?.count ?? 0;
  const rows = await env.DB.prepare(
    `SELECT id, category, title, author, content, created_at, view_count,
            (SELECT COUNT(*) FROM attachments WHERE attachments.post_id = posts.id) AS attachment_count
     FROM posts ${listFilter.where}
     ORDER BY created_at DESC
     LIMIT ? OFFSET ?`,
  )
    .bind(...listFilter.binds, boardPageSize, (page - 1) * boardPageSize)
    .all<PostRow>();

  let notices: ReturnType<typeof toSummary>[] = [];
  let noticeCount = 0;
  if (category === "all") {
    const noticeFilter = buildFilter("notice", query);
    const noticeTotal = await env.DB.prepare(`SELECT COUNT(*) AS count FROM posts ${noticeFilter.where}`)
      .bind(...noticeFilter.binds)
      .first<{ count: number }>();
    noticeCount = noticeTotal?.count ?? 0;
    const noticeRows = await env.DB.prepare(
      `SELECT id, category, title, author, content, created_at, view_count,
              (SELECT COUNT(*) FROM attachments WHERE attachments.post_id = posts.id) AS attachment_count
       FROM posts ${noticeFilter.where}
       ORDER BY created_at DESC
       LIMIT 20`,
    )
      .bind(...noticeFilter.binds)
      .all<PostRow>();
    notices = noticeRows.results.map(toSummary);
  }

  return {
    notices,
    posts: rows.results.map(toSummary),
    total,
    matchCount: category === "all" ? total + noticeCount : total,
    page,
    pageSize: boardPageSize,
  };
}

async function readPost(env: Env, id: string) {
  const existing = await env.DB.prepare("SELECT id FROM posts WHERE id = ?").bind(id).first<{ id: string }>();
  if (!existing) return null;
  await env.DB.prepare("UPDATE posts SET view_count = view_count + 1 WHERE id = ?").bind(id).run();
  const row = await env.DB.prepare(
    `SELECT id, category, title, author, content, created_at, view_count, 0 AS attachment_count
     FROM posts WHERE id = ?`,
  )
    .bind(id)
    .first<PostRow>();
  if (!row) return null;
  const attachments = await env.DB.prepare(
    "SELECT id, file_name, content_type, size FROM attachments WHERE post_id = ? ORDER BY created_at ASC",
  )
    .bind(id)
    .all<AttachmentRow>();
  return {
    ...toSummary(row),
    content: row.content,
    attachments: attachments.results.map((file) => ({
      id: file.id,
      fileName: file.file_name,
      contentType: file.content_type,
      size: file.size,
    })),
  };
}

async function createPost(request: Request, env: Env) {
  const contentType = request.headers.get("Content-Type") ?? "";
  if (contentType.includes("multipart/form-data")) {
    return createPostWithFiles(request, env);
  }

  const contentLength = Number(request.headers.get("Content-Length") ?? "0");
  if (contentLength > 32_768) {
    throw new HttpError("요청 크기가 너무 큽니다.", 413);
  }
  if (!contentType.includes("application/json")) {
    throw new HttpError("JSON 형식으로 보내 주세요.", 415);
  }

  const body: unknown = await request.json().catch(() => {
    throw new HttpError("요청 본문을 읽지 못했습니다.", 400);
  });
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    throw new HttpError("글 내용이 올바르지 않습니다.", 400);
  }
  const record = body as Record<string, unknown>;
  const fields = readPostFields({
    category: typeof record.category === "string" ? record.category : "",
    title: typeof record.title === "string" ? record.title : "",
    author: typeof record.author === "string" ? record.author : "",
    content: typeof record.content === "string" ? record.content : "",
  });
  return insertPost(env, fields, []);
}

async function createPostWithFiles(request: Request, env: Env) {
  const contentLength = Number(request.headers.get("Content-Length") ?? "0");
  const maxBytes = boardLimits.files * boardLimits.fileBytes + 65_536;
  if (contentLength > maxBytes) {
    throw new HttpError("요청 크기가 너무 큽니다.", 413);
  }

  const form = await request.formData().catch(() => {
    throw new HttpError("첨부파일을 읽지 못했습니다.", 400);
  });
  const fields = readPostFields({
    category: stringField(form.get("category")),
    title: stringField(form.get("title")),
    author: stringField(form.get("author")),
    content: stringField(form.get("content")),
  });
  const files = form.getAll("file").filter((item): item is File => item instanceof File && item.name !== "");
  if (files.length > boardLimits.files) {
    throw new HttpError(`첨부파일은 ${boardLimits.files}개까지 올릴 수 있습니다.`, 400);
  }
  for (const file of files) {
    const fileName = baseFileName(file.name);
    if (!fileName) throw new HttpError("파일 이름이 올바르지 않습니다.", 400);
    if (file.size <= 0) throw new HttpError("빈 파일은 올릴 수 없습니다.", 400);
    if (file.size > boardLimits.fileBytes) {
      throw new HttpError(`파일 하나당 ${Math.floor(boardLimits.fileBytes / (1024 * 1024))}MB 이하만 올릴 수 있습니다.`, 400);
    }
  }

  return insertPost(env, fields, files);
}

async function insertPost(
  env: Env,
  fields: { category: string; title: string; author: string; content: string },
  files: File[],
) {
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();
  await env.DB.prepare(
    "INSERT INTO posts (id, category, title, author, content, created_at, view_count) VALUES (?, ?, ?, ?, ?, ?, 0)",
  )
    .bind(id, fields.category, fields.title, fields.author, fields.content, createdAt)
    .run();

  const uploadedKeys: string[] = [];
  const attachments: Array<{ id: string; fileName: string; contentType: string; size: number }> = [];
  try {
    for (const file of files) {
      const attachmentId = crypto.randomUUID();
      const objectKey = `posts/${id}/${attachmentId}`;
      const fileName = baseFileName(file.name);
      const storedType = safeContentType(file.type);
      await env.FILES.put(objectKey, await file.arrayBuffer(), { httpMetadata: { contentType: storedType } });
      uploadedKeys.push(objectKey);
      await env.DB.prepare(
        "INSERT INTO attachments (id, post_id, file_name, content_type, size, object_key, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)",
      )
        .bind(attachmentId, id, fileName, storedType, file.size, objectKey, createdAt)
        .run();
      attachments.push({ id: attachmentId, fileName, contentType: storedType, size: file.size });
    }
  } catch (error) {
    await env.DB.prepare("DELETE FROM posts WHERE id = ?").bind(id).run();
    await Promise.all(uploadedKeys.map((key) => env.FILES.delete(key)));
    throw error;
  }

  return {
    id,
    category: fields.category,
    title: fields.title,
    author: fields.author,
    content: fields.content,
    createdAt,
    viewCount: 0,
    attachmentCount: attachments.length,
    attachments,
  };
}

async function readFile(env: Env, postId: string, fileId: string) {
  const row = await env.DB.prepare(
    "SELECT file_name, content_type, object_key FROM attachments WHERE id = ? AND post_id = ?",
  )
    .bind(fileId, postId)
    .first<{ file_name: string; content_type: string; object_key: string }>();
  if (!row) return null;
  const object = await env.FILES.get(row.object_key);
  if (!object) return null;
  return { body: object.body, fileName: row.file_name, contentType: safeContentType(row.content_type) };
}

function readPostFields(input: { category: string; title: string; author: string; content: string }) {
  const category = input.category;
  const title = input.title.trim();
  const author = input.author.trim();
  const content = input.content.trim();
  if (!categories.has(category)) throw new HttpError("분류를 선택해 주세요.", 400);
  if (!title) throw new HttpError("제목을 입력해 주세요.", 400);
  if (title.length > boardLimits.title) throw new HttpError(`제목은 ${boardLimits.title}자 이하로 입력해 주세요.`, 400);
  if (!author) throw new HttpError("글쓴이를 입력해 주세요.", 400);
  if (author.length > boardLimits.author) {
    throw new HttpError(`글쓴이는 ${boardLimits.author}자 이하로 입력해 주세요.`, 400);
  }
  if (!content) throw new HttpError("내용을 입력해 주세요.", 400);
  if (content.length > boardLimits.content) {
    throw new HttpError(`내용은 ${boardLimits.content}자 이하로 입력해 주세요.`, 400);
  }
  return { category, title, author, content };
}

function stringField(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value : "";
}

function baseFileName(name: string) {
  const base = name.replaceAll("\\", "/").split("/").pop() ?? "";
  return base.replace(/[\r\n"]/g, "").trim().slice(0, 200);
}

function safeContentType(value: string) {
  const type = value.split(";")[0]?.trim().toLowerCase() ?? "";
  if (!type || type === "text/html" || type === "image/svg+xml" || type === "application/xhtml+xml") {
    return "application/octet-stream";
  }
  return type;
}

function contentDisposition(fileName: string) {
  const fallback = fileName.replace(/[^\x20-\x7E]/g, "_").replace(/["\\]/g, "_") || "download";
  return `attachment; filename="${fallback}"; filename*=UTF-8''${encodeURIComponent(fileName)}`;
}

function buildFilter(category: string, query: string) {
  const clauses: string[] = [];
  const binds: string[] = [];
  if (category === "all") clauses.push("category != 'notice'");
  else {
    clauses.push("category = ?");
    binds.push(category);
  }
  if (query) {
    const pattern = `%${query.replace(/[\\%_]/g, (character) => `\\${character}`)}%`;
    clauses.push("(title LIKE ? ESCAPE '\\' OR author LIKE ? ESCAPE '\\' OR content LIKE ? ESCAPE '\\')");
    binds.push(pattern, pattern, pattern);
  }
  return { where: `WHERE ${clauses.join(" AND ")}`, binds };
}

function toSummary(row: PostRow) {
  return {
    id: row.id,
    category: row.category,
    title: row.title,
    author: row.author,
    createdAt: row.created_at,
    viewCount: row.view_count,
    attachmentCount: row.attachment_count,
  };
}

function parsePage(value: string | null) {
  const page = Number(value ?? "1");
  if (!Number.isInteger(page) || page < 1 || page > 10_000) return 1;
  return page;
}

function corsHeaders(origin: string | null): Headers {
  const headers = new Headers();
  if (origin && allowedOrigins.has(origin)) {
    headers.set("Access-Control-Allow-Origin", origin);
  }
  headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type");
  headers.set("Access-Control-Max-Age", "86400");
  headers.set("Vary", "Origin");
  headers.set("Cache-Control", "no-store");
  return headers;
}

function json(data: unknown, status: number, cors: Headers) {
  const headers = new Headers(cors);
  headers.set("Content-Type", "application/json; charset=utf-8");
  return new Response(JSON.stringify(data), { status, headers });
}

class HttpError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}
