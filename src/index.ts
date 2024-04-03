import { config } from 'dotenv';
import * as postgres from './database/postgres'
import express from 'express';
import { sendVerifyEmail } from './modules/email';

// load environment variables
config();

const app = express();

app.use(express.json());

app.listen(process.env.PORT, async () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    await postgres.connect();

    //await sendVerifyEmail('hdgamer1404Jonas@gmail.com', 'testtoken');
    const result = await postgres.createUser({ email: 'hdgamer1404Jonas@gmail.com', password: 'testpassword', name: 'Jonas' });
    console.log(result);
});