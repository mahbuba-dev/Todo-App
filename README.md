# Task API

A CRUD API for managing a to-do list, built with Node.js, Express, and TypeScript. Started as an in-memory API, then evolved to SQLite persistence, and now runs as a fully containerized stack with PostgreSQL.

## How to run (Docker — recommended)

1. Clone the repo
2. Copy `.env.example` to `.env` (no changes needed for local Docker use — the compose file supplies its own environment values to the app container)
3. Start the whole stack with one command:

```bash
docker compose up
```

This builds the app image, starts PostgreSQL with a persistent volume, creates the `tasks` table if it doesn't exist, and seeds 3 example tasks on first run.

The API is available at `http://localhost:3000`.

To stop the stack: `Ctrl+C`, or `docker compose down` (add `-v` only if you also want to wipe the database volume).

## How to run (without Docker)

Requires a local PostgreSQL instance and Node.js v22+.

```bash
npm install
npm run dev
```

Make sure `DATABASE_URL` in `.env` points to your local Postgres instance before starting.

## Environment variables

Connection details are provided via `DATABASE_URL`, gitignored in `.env` and documented in `.env.example`:

```
DATABASE_URL=postgresql://postgres:mysecretpassword@localhost:5555/todo_db
```

When running via `docker compose up`, the app container receives its own `DATABASE_URL` directly from `docker-compose.yml`, using the Postgres service's internal hostname (`postgres`) instead of `localhost`, since both containers share a Docker network.

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | /tasks | Get all tasks |
| GET | /tasks/:id | Get a task by id |
| POST | /tasks | Create a new task |
| PUT | /tasks/:id | Update a task |
| DELETE | /tasks/:id | Delete a task |

## Example request

```
curl.exe -i http://localhost:3000/tasks

HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 138

[{"id":1,"title":"Buy milk","done":false},{"id":2,"title":"Finish assignment","done":false},{"id":3,"title":"Read chapter 3","done":true}]
```

## Swagger UI

Visit `http://localhost:3000/docs` for interactive API documentation.

![Swagger UI screenshot](screenshots/swagger-ui.png)
![Swagger UI screenshot](screenshots/swagger-ui-1.png)

## Architecture — repository pattern

Storage is implemented behind a `TaskRepository` interface, with `PostgresTaskRepository` as the current implementation (SQLite and in-memory versions were used in earlier stages of this project). The service layer and route/controller layer were not changed in *logic* when swapping storage engines — only `async`/`await` was added throughout, since Postgres queries (via the `pg` library) are asynchronous, whereas the earlier SQLite implementation was synchronous. This is an honest exception to "zero changes": business logic, validation rules, and status codes are identical; only the sync-to-async plumbing changed, which is a direct, expected consequence of swapping storage engines rather than a redesign of the API.

## Database evolution

This project was built up in stages:

1. **In-memory array** — data lost on every restart
2. **SQLite** (`node:sqlite`) — file-based persistence, single file (`tasks.db`)
3. **PostgreSQL in Docker** (current) — full database server, containerized, with a persistent volume so data survives both app and container restarts

## Persistence proof

Verified persistence in two stages:

1. **Manual container test:** created a task via `POST /tasks`, ran `docker restart todo-postgres` and restarted the Node server — `GET /tasks` still showed all tasks, including the newly created one.
2. **Full compose stack test:** created a task via `POST /tasks` while running under `docker compose up`, stopped the entire stack (`Ctrl+C`), restarted it (`docker compose up`), and confirmed via `GET /tasks` that all 4 tasks (3 seeded + 1 created) were still present.

This confirms data survives both individual container restarts and full stack restarts, thanks to the named Docker volume (`todo-postgres-data`) mounted at `/var/lib/postgresql`.

### Example verification

```
GET /tasks

id title                     done
-- -----                     ----
 1 Buy milk                 False
 2 Finish assignment        False
 3 Read chapter 3            True
 4 Compose persistence test False
```
