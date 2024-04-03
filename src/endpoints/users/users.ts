import express from 'express';

import { handleCreateUser } from './create';
import { handleVerifyEmail } from './verify';

export async function handleUserApi(req: express.Request, res: express.Response): Promise<void> {
    // get the request path
    const path = req.path;
    let paths = path.split('/');

    switch (paths[2]) {
        case 'create':
            await handleCreateUser(req, res).catch((err) => {
                console.error(err);
                res.status(500).send('Internal Server Error');
            });
            break;
        
        case 'verify':
            await handleVerifyEmail(req, res).catch((err) => {
                console.error(err);
                res.status(500).send('Internal Server Error');
            });
            break;

        default:
            res.status(404).send('Not Found');
            break;
    }
}