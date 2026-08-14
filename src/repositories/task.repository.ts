import { Task } from '../types/task';

export interface TaskRepository {
  getAllTasks(): Promise<Task[]>;
  getTaskById(id: number): Promise<Task | undefined>;
  createTask(title: string): Promise<Task>;
  updateTask(id: number, updates: Partial<Pick<Task, 'title' | 'done'>>): Promise<Task | undefined>;
  deleteTask(id: number): Promise<boolean>;
}