import express, { Request, Response } from 'express';
import taskRoutes from '../src/tasks/task.router';
import cors from "cors";
import swaggerUi from 'swagger-ui-express';
import openapiSpec from '../src/openapi.json';
import { initDb } from './db/postgres';
import authRoutes from '../src/auth/auth.routes';
import { requireAuth, AuthRequest } from './auth/auth.middleware';
import { supabase } from './auth/supabaseClient';

const app = express()
app.use(express.json())
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    name: 'Task API',
    version: '1.0',
    endpoints: ['/tasks', '/auth'],
  });
});

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    message: "Server is healthy"
  });
});

app.get('/public/info', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Welcome stranger! This info is public.' });
});



app.get('/protected/profile', requireAuth, (req: AuthRequest, res: Response) => {
  res.status(200).json(req.user);
});

app.get('/protected/dashboard', requireAuth, (req: AuthRequest, res: Response) => {
  res.status(200).json({ message: `Welcome to your dashboard, ${req.user?.email}` });
});

app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiSpec));

app.post('/auth/logout', requireAuth, async (req: AuthRequest, res: Response) => {
  await supabase.auth.signOut();
  res.status(204).send();
});

const startServer = async () => {
  await initDb();
  app.listen(3000, () => console.log('Server running on port 3000'));
};

startServer();