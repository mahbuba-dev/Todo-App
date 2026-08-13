import { DatabaseSync } from 'node:sqlite';

const db = new DatabaseSync('tasks.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    done BOOLEAN NOT NULL DEFAULT 0
  )
`);

const row = db.prepare('SELECT COUNT(*) as count FROM tasks').get() as unknown as { count: number };

if (row.count === 0) {
  const insert = db.prepare('INSERT INTO tasks (title, done) VALUES (?, ?)');
  insert.run('Buy milk', 0);
  insert.run('Finish assignment', 0);
  insert.run('Read chapter 3', 1);
}

export default db;