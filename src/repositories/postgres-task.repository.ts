import { Task } from '../types/task';
import { TaskRepository } from './task.repository';
import { pool } from '../db/postgres';

export class PostgresTaskRepository implements TaskRepository {
  async getAllTasks(): Promise<Task[]> {
    const { rows } = await pool.query('SELECT * FROM tasks');
    return rows;
  }

  async getTaskById(id: number): Promise<Task | undefined> {
    const { rows } = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
    return rows[0];
  }

  async createTask(title: string): Promise<Task> {
    const { rows } = await pool.query(
      'INSERT INTO tasks (title, done) VALUES ($1, $2) RETURNING *',
      [title, false]
    );
    return rows[0];
  }

  async updateTask(
    id: number,
    updates: Partial<Pick<Task, 'title' | 'done'>>
  ): Promise<Task | undefined> {
    const existing = await this.getTaskById(id);
    if (!existing) return undefined;

    const newTitle = updates.title !== undefined ? updates.title : existing.title;
    const newDone = updates.done !== undefined ? updates.done : existing.done;

    const { rows } = await pool.query(
      'UPDATE tasks SET title = $1, done = $2 WHERE id = $3 RETURNING *',
      [newTitle, newDone, id]
    );
    return rows[0];
  }

  async deleteTask(id: number): Promise<boolean> {
    const result = await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
    return (result.rowCount ?? 0) > 0;
  }
}