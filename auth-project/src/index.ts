import express, { application, response } from 'express'
import { request } from 'http';
import UserRouter from './routes/user.routes';

const app = express();

app.use(express.json())
app.use('/users', UserRouter)

app.listen(3333, () => console.log("Server started on 3333"));