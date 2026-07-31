
import express, { Request, Response } from 'express';
import taskRoutes from '../src/tasks/task.router';

const app = express()
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  // your Stage 1 response here
});

app.get('/health', (req: Request, res: Response) => {
  // your Stage 1 response here
});
app.use('/tasks', taskRoutes );
app.listen(3000, () => console.log('Server running on port 3000'));