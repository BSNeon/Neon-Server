import express from 'express';
import { createUser } from '../../database/postgres';

const emailRegex = "^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$" // regex for email validation

export async function handleCreateUser(req: express.Request, res: express.Response): Promise<void> {
    
    if (!req.body) {
        res.status(400).send('Bad Request');
        return;
    }

    if (!req.body.email || !req.body.password || !req.body.username) {
        res.status(400).send('Missing Fields');
        return;
    }
    
    // get the request body
    const body = req.body;
    const email = body.email;
    const password = body.password;
    const username = body.username;

    if (!email.match(emailRegex)) {
        res.status(400).send('Invalid Email');
        return;
    }

    if (password.length < 8) {
        res.status(400).send('Invalid Password');
        return;
    }

    if (username.length < 3 || username.length > 20 || !username.match("^[a-zA-Z0-9]*$")) {
        res.status(400).send('Invalid Username');
        return;
    }

    const result = await createUser({ email, password, name: username }).catch((err) => {
        console.error(err);
        res.status(500).send('Internal Server Error');
        return;
    });

    if (result === null) {
        res.status(400).send('User with email already exists');
        return;
    }

    res.status(200).json(result);
}