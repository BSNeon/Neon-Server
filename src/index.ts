import { config } from 'dotenv';
import * as postgres from './database/postgres'
import express from 'express';
import { handleApi } from './endpoints/endpoints';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// load environment variables
config();

const app = express();

app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(cookieParser());

app.post('/*', async (req, res) => {
    await handleApi(req, res).catch((err) => {
        console.error(err);
        res.status(500).send('Internal Server Error');
    });
});

app.get('/*', async (req, res) => {
    await handleApi(req, res).catch((err) => {
        console.error(err);
        res.status(500).send('Internal Server Error');
    });
});


app.listen(process.env.PORT, async () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    await postgres.connect();
});