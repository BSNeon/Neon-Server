import express from 'express';

import { handleCreateUser } from './create';
import { handleVerifyEmail } from './verify';
import { handleLogin } from './login';

const unknownError = { type: 'error', code: 5000, message: 'Unknown Error' };

export async function handleUserApi(req: express.Request, res: express.Response): Promise<void> {
    // get the request path
    const path = req.path;
    let paths = path.split('/');

    switch (paths[2]) {
        case 'create':
            await handleCreateUser(req, res).catch((err) => {
                console.error(err);
                res.status(500).json(unknownError);
            });
            break;
        
        case 'verify':
            await handleVerifyEmail(req, res).catch((err) => {
                console.error(err);
                res.status(500).json(unknownError);
            });
            break;

        case 'login':
            await handleLogin(req, res).catch((err) => {
                console.error(err);
                res.status(500).json(unknownError);
            });
            break;
        
        default:
            res.status(404).send('Not Found');
            break;
    }
}