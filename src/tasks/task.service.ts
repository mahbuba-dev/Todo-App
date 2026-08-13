import db from '../db/database';
import { Task } from '../types/task';

interface TaskRow {
  id: number;
  title: string;
  done: number; // SQLite stores booleans as 0/1
}

const toTask = (row: TaskRow): Task => ({
  id: row.id,
  title: row.title,
  done: Boolean(row.done),
});

export const getAllTasks = (): Task[] => {
  const rows = db.prepare('SELECT * FROM tasks').all() as unknown as TaskRow[];
  return rows.map(toTask);
};

export const getTaskById = (id: number): Task | undefined => {
  const row = db.prepare('SELECT * FROM tasks WHERE id = ?').get(id) as unknown as TaskRow | undefined;
  return row ? toTask(row) : undefined;
};

export const createTask = (title: string): Task => {
  const insert = db.prepare('INSERT INTO tasks (title, done) VALUES (?, ?)');
  const result = insert.run(title, 0);
  const newId = result.lastInsertRowid as number;
  return { id: newId, title, done: false };
};

export const updateTask = (
  id: number,
  updates: Partial<Pick<Task, 'title' | 'done'>>
): Task | undefined => {
  const existing = getTaskById(id);
  if (!existing) return undefined;

  const newTitle = updates.title !== undefined ? updates.title : existing.title;
  const newDone = updates.done !== undefined ? updates.done : existing.done;

  db.prepare('UPDATE tasks SET title = ?, done = ? WHERE id = ?').run(
    newTitle,
    newDone ? 1 : 0,
    id
  );

  return { id, title: newTitle, done: newDone };
};

export const deleteTask = (id: number): boolean => {
  const result = db.prepare('DELETE FROM tasks WHERE id = ?').run(id);
  return result.changes > 0;
};