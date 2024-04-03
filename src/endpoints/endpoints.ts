import express from 'express';

import { handleUserApi } from './users/users';


export async function handleApi(req: express.Request, res: express.Response): Promise<void> {
    // get the request path
    const path = req.path;
    let paths = path.split('/');

    switch (paths[2]) {
        case 'users':
            await handleUserApi(req, res).catch((err) => {
                console.error(err);
                res.status(500).send('Internal Server Error');
            });
            break;

        default:
            res.status(404).send('Not Found');
            break;
    }
}