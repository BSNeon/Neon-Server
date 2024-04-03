import { config } from 'dotenv';
import * as postgres from './database/postgres'
import express from 'express';
import { handleApi } from './endpoints/endpoints';

// load environment variables
config();

const app = express();

app.use(express.json());

app.get('/api/*', async (req, res) => {
    await handleApi(req, res).catch((err) => {
        console.error(err);
        res.status(500).send('Internal Server Error');
    });
});

app.listen(process.env.PORT, async () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    await postgres.connect();

    //await sendVerifyEmail('hdgamer1404Jonas@gmail.com', 'testtoken');
    const result = await postgres.createUser({ email: 'hdgamer1404Jonas@gmail.com', password: 'testpassword', name: 'Jonas' });
    console.log(result);
});