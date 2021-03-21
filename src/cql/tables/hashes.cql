CREATE TABLE IF NOT EXISTS ?.hashes (
    id text PRIMARY KEY,
    token_type text,
    access_token text,
    refresh_token text,
    expires_timestamp timestamp
);
