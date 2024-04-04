import express from 'express';
import * as postgres from '../../database/postgres';
import * as types from '../../types/types';

export async function handleProfileInfo(req: express.Request, res: express.Response) {
    if (!req.cookies || !req.cookies['token']) {
        const rejJson = { type: 'error', code: 4001, message: 'Unauthorized' };
        res.status(401).send(rejJson);
        return;
    }
    
    const cookie = req.cookies['token'];
    if (!cookie) {
        const rejJson = { type: 'error', code: 4001, message: 'Unauthorized' };
        res.status(401).send(rejJson);
        return;
    }

    const user = await postgres.getUserByJWT(cookie).catch((err) => {
        console.error(err);
        const rejJson = { type: 'error', code: 5001, message: 'Database Error' };
        res.status(500).json(rejJson);
        return;
    });

    if (!user) {
        const rejJson = { type: 'error', code: 4001, message: 'Unauthorized' };
        res.status(401).send(rejJson);
        return;
    }

    const resJson = { type: 'success', code: 2000, message: 'User Info', data: user };
    res.status(200).json(resJson);
    return;
}