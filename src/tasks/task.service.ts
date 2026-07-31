import { Task } from "../types/task";


let tasks: Task[] = [
  { id: 1, title: 'Buy milk', done: false },
  { id: 2, title: 'Finish assignment', done: false },
  { id: 3, title: 'Read chapter 3', done: true },
];

export const getAllTasks = (): Task[] => {
  return tasks;
};

export const getTaskById = (id: number): Task | undefined => {
  return tasks.find((t) => t.id === id);
};

export const createTask = (title: string): Task => {
  const nextId = tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
  const newTask: Task = { id: nextId, title, done: false };
  tasks.push(newTask);
  return newTask;
};

export const updateTask = (
  id: number,
  updates: Partial<Pick<Task, 'title' | 'done'>>
): Task | undefined => {
  const task = getTaskById(id);
  if (!task) return undefined;

  if (updates.title !== undefined) task.title = updates.title;
  if (updates.done !== undefined) task.done = updates.done;

  return task;
};

export const deleteTask = (id: number): boolean => {
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return false;

  tasks.splice(index, 1);
  return true;
};