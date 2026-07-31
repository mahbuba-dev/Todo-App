# Task APP

A simple CRUD API for managing a to-do list, built with Node.js, Express, and TypeScript.

## How to run

\`\`\`bash
npm install
npm run dev
\`\`\`

Server runs on `http://localhost:3000`

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