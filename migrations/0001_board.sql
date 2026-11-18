CREATE TABLE posts (
  id TEXT PRIMARY KEY,
  category TEXT NOT NULL CHECK (category IN ('notice', 'question', 'free')),
  title TEXT NOT NULL CHECK (length(trim(title)) > 0 AND length(title) <= 80),
  author TEXT NOT NULL CHECK (length(trim(author)) > 0 AND length(author) <= 20),
  content TEXT NOT NULL CHECK (length(trim(content)) > 0 AND length(content) <= 5000),
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  view_count INTEGER NOT NULL DEFAULT 0 CHECK (view_count >= 0)
);

CREATE TABLE attachments (
  id TEXT PRIMARY KEY,
  post_id TEXT NOT NULL REFERENCES posts (id) ON DELETE CASCADE,
  file_name TEXT NOT NULL CHECK (length(trim(file_name)) > 0),
  content_type TEXT NOT NULL CHECK (length(trim(content_type)) > 0),
  size INTEGER NOT NULL CHECK (size >= 0 AND size <= 10485760),
  object_key TEXT NOT NULL CHECK (length(trim(object_key)) > 0),
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE INDEX idx_posts_created_at ON posts (created_at DESC);
CREATE INDEX idx_attachments_post_id ON attachments (post_id);
