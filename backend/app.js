import { config } from 'dotenv';
config({});
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import imageRouter from './routes/image.js';
import { errorMiddleware } from './middlewares/error.js';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('nice');
});

app.use('/api/v1', imageRouter);

app.use(errorMiddleware);
export default app;
