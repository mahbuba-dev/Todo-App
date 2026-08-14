
import express, { Request, Response } from 'express';
import taskRoutes from '../src/tasks/task.router';
import cors from "cors";
import swaggerUi from 'swagger-ui-express';
import openapiSpec from '../src/openapi.json';
import { initDb } from './db/postgres';

const startServer = async () => {
  await initDb();
  app.listen(3000, () => console.log('Server running on port 3000'));
};

startServer();

const app = express()
app.use(express.json())

app.use(cors());



app.get('/', (req: Request, res: Response) => {
  // your Stage 1 response here
});

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    message: "Server is healthy"
  });
});




app.use('/tasks', taskRoutes );
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiSpec));
app.listen(3000, () => console.log('Server running on port 3000'));