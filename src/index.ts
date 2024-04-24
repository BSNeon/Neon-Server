import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import { config } from 'dotenv';

import router from './router';

config();

const app = express();

app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is running on port ${process.env.SERVER_PORT}`);
});

mongoose.Promise = Promise;
const uri = process.env.MONGO_URI;
mongoose.connect(uri);
mongoose.connection.on('error', (error: Error) => {
    console.error(error);
});

app.use('/', router());