CREATE TABLE inquiries (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL CHECK (length(trim(name)) > 0 AND length(name) <= 20),
  contact TEXT NOT NULL CHECK (length(trim(contact)) > 0 AND length(contact) <= 100),
  title TEXT NOT NULL CHECK (length(trim(title)) > 0 AND length(title) <= 80),
  content TEXT NOT NULL CHECK (length(trim(content)) > 0 AND length(content) <= 2000),
  consented INTEGER NOT NULL CHECK (consented = 1),
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE INDEX idx_inquiries_created_at ON inquiries (created_at DESC);
