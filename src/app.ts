import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { userRoutes } from './app/modules/user/user.routes';
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// routers ----------
app.use('/api', userRoutes);
app.get('/', (req: Request, res: Response) => {
  res.send('User Management');
});

app.all('*', (req: Request, res: Response) => {
  res.status(404).json({ success: false, message: 'route is not found' });
});

export default app;
