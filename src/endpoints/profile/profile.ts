import express from 'express';

import { handleProfileInfo } from './info';

const unknownError = { type: 'error', code: 5000, message: 'Unknown Error' };

export async function handleProfileApi(req: express.Request, res: express.Response): Promise<void> {
    // get the request path
    const path = req.path;
    let paths = path.split('/');

    switch (paths[2]) {
        case 'info':
            await handleProfileInfo(req, res).catch((err) => {
                console.error(err);
                res.status(500).json(unknownError);
            });
            break;
        
        default:
            res.status(404).send('Not Found');
            break;
    }
}