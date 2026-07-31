import { Request, Response } from 'express';
import * as taskService from '../tasks/task.service'
;

export const getAllTasks = (req: Request, res: Response) => {
  res.json(taskService.getAllTasks());
};

export const getTaskById = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const task = taskService.getTaskById(id);

  if (!task) {
    return res.status(404).json({ error: `Task ${id} not found` });
  }

  res.json(task);
};

export const createTask = (req: Request, res: Response) => {
  const { title } = req.body;

  if (!title || typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ error: 'title is required and must be a non-empty string' });
  }

  const newTask = taskService.createTask(title);
  res.status(201).json(newTask);
};

export const updateTask = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { title, done } = req.body;

  if (title !== undefined && (typeof title !== 'string' || title.trim() === '')) {
    return res.status(400).json({ error: 'title must be a non-empty string' });
  }
  if (done !== undefined && typeof done !== 'boolean') {
    return res.status(400).json({ error: 'done must be a boolean' });
  }

  const updated = taskService.updateTask(id, { title, done });

  if (!updated) {
    return res.status(404).json({ error: `Task ${id} not found` });
  }

  res.json(updated);
};

export const deleteTask = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const success = taskService.deleteTask(id);

  if (!success) {
    return res.status(404).json({ error: `Task ${id} not found` });
  }

  res.status(204).send();
};

