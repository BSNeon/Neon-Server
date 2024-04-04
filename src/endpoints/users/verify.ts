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
        const rejJson = { type: 'error', code: 5001, message: 'Database Error'}
        res.status(500).json(rejJson);
        return;
    });

    if (!result) {
        const frontendUrl = process.env.FRONTEND_URL;
        res.redirect(`${frontendUrl}`);
        return;
    }
    
    const frontendUrl = process.env.FRONTEND_URL;
    res.redirect(`${frontendUrl}/verified?id=${result.id}`);
}