# Task APP

A simple CRUD API for managing a to-do list, built with Node.js, Express, and TypeScript.

## How to run

\`\`\`bash
npm install
npm run dev
\`\`\`

Server runs on `http://localhost:3000`

## Database (SQLite)

This project uses SQLite for persistent storage, via Node.js's built-in `node:sqlite` module (available in Node.js v22+). No external native dependencies or compilation tools are required — the database works out of the box.

**Why SQLite:** it's a lightweight, file-based database with no separate server to install or manage — ideal for a small project like this, while still teaching real SQL and persistence concepts.

**Database file location:** `tasks.db`, created automatically in the project root the first time the server runs. It's gitignored, so a fresh clone will generate its own database with the 3 example tasks pre-seeded.

## How to run

\`\`\`bash
npm install
npm run dev
\`\`\`

Server runs on `http://localhost:3000`. The SQLite database (`tasks.db`) and `tasks` table are created automatically on first run.



## Example SQL query

\`\`\`sql
SELECT * FROM tasks WHERE done = 1;
\`\`\`

This returns only the completed tasks — verified that updating data directly in the database (e.g. `UPDATE tasks SET done = 1;`) is immediately reflected by the API without any code changes, since the API and the database share the same underlying data.

## Persistence proof

Created a task via `POST /tasks`, restarted the server, then called `GET /tasks` again — the task was still present. Unlike Assignment 1 (in-memory storage), data now survives restarts.

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | /tasks | Get all tasks |
| GET | /tasks/:id | Get a task by id |
| POST | /tasks | Create a new task |
| PUT | /tasks/:id | Update a task |
| DELETE | /tasks/:id | Delete a task |

## Example request

\`\`\`
curl.exe -i http://localhost:3000/tasks
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 138
ETag: W/"8a-cRNWY8qX1Xd0jz+K/MCEa6Jomvo"
Date: Fri, 31 Jul 2026 04:46:35 GMT
Connection: keep-alive
Keep-Alive: timeout=5

[{"id":1,"title":"Buy milk","done":false},{"id":2,"title":"Finish assignment","done":false},{"id":3,"title":"Read chapter 3","done":true}]
\`\`\`

### Swagger UI

Visit `http://localhost:3000/docs` for interactive API documentation.

![Swagger UI screenshot](screenshots\swagger-ui.png)   