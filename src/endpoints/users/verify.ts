import express from 'express';
import * as postgres from '../../database/postgres';
import * as types from '../../types/types';

export async function handleVerifyEmail(req: express.Request, res: express.Response) {
    const path = req.path;
    let paths = path.split('/');

    if (paths.length !== 4) {
        const frontendUrl = process.env.FRONTEND_URL;
        res.redirect(`${frontendUrl}`);
        return;
    }

    const token = paths[3];

    if (!token) {
        const frontendUrl = process.env.FRONTEND_URL;
        res.redirect(`${frontendUrl}`);
        return;
    }

    let result = await postgres.verifyEmail(token).catch((err) => {
        console.error(err);
        res.status(500).send('Internal Server Error');
        return;
    });

    if (!result) {
        const frontendUrl = process.env.FRONTEND_URL;
        res.redirect(`${frontendUrl}`);
        return;
    }

    console.log(result);

    const frontendUrl = process.env.FRONTEND_URL;
    res.redirect(`${frontendUrl}/verified?id=${result.id}`);
}