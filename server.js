import express from 'express';
import dotenv from 'dotenv';
import taskrouter from './routes/taskroutes.js';
import userrouter from './routes/userroutes.js';
import connectDB from './database/database.js';
import errorHandler from './middleware/errormiddleware.js';
import cors from 'cors';

dotenv.config();

const app = express();            // FIRST create app()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: process.env.clientURL,
  credentials: true
}));
const port = process.env.PORT;

app.use('/task-app', taskrouter);
app.use('/task-app', userrouter);

app.use(errorHandler);

app.listen(port, () => console.log(`server listens at http://localhost:${port}/task-app`));

connectDB();

export default app;
