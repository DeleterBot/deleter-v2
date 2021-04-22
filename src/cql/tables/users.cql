CREATE TABLE IF NOT EXISTS ?.users (
    id text PRIMARY KEY,
    gender text,
    presences_enabled boolean,
    presences_started timestamp,
    latest_status_presence latest_presence,
    presences frozen<list<presence>>,
)
