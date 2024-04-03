import { config } from 'dotenv';
import * as postgres from './database/postgre'
import express from 'express';

// load environment variables
config();

const app = express();

app.use(express.json());

app.listen(process.env.PORT, async () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    await postgres.connect();
});