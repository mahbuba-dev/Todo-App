import { Task } from '../types/task';
import { TaskRepository } from '../repositories/task.repository';
import { PostgresTaskRepository } from '../repositories/postgres-task.repository';

const repository: TaskRepository = new PostgresTaskRepository();

export const getAllTasks = (): Promise<Task[]> => repository.getAllTasks();

export const getTaskById = (id: number): Promise<Task | undefined> =>
  repository.getTaskById(id);

export const createTask = (title: string): Promise<Task> =>
  repository.createTask(title);

export const updateTask = (
  id: number,
  updates: Partial<Pick<Task, 'title' | 'done'>>
): Promise<Task | undefined> => repository.updateTask(id, updates);

export const deleteTask = (id: number): Promise<boolean> =>
  repository.deleteTask(id);