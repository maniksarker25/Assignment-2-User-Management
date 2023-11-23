import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { userRoutes } from './app/modules/user/user.routes';
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// routers ----------
app.use('/api', userRoutes);

app.get('/amni', (req, res) => {
  res.send('kdjdk');
});
app.get('/', (req: Request, res: Response) => {
  res.send('User Management');
});

export default app;
