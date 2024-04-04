import express from 'express';
import { createUser } from '../../database/postgres';

const emailRegex = "^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$" // regex for email validation

export async function handleCreateUser(req: express.Request, res: express.Response): Promise<void> {
    
    if (!req.body) {
        const rejJson = { type: 'error', code: 3011, message: 'Bad Request' }
        res.status(400).json(rejJson);
        return;
    }

    if (!req.body.email || !req.body.password || !req.body.username) {
        const rejJson = { type: 'error', code: 3012, message: 'Missing Parameters' }
        res.status(400).json(rejJson);
        return;
    }
    
    // get the request body
    const body = req.body;
    const email = body.email;
    const password = body.password;
    const username = body.username;

    if (!email.match(emailRegex)) {
        const rejJson = { type: 'error', code: 3001, message: 'Invalid Email'}
        res.status(400).json(rejJson);
        return;
    }

    if (password.length < 8) {
        const rejJson = { type: 'error', code: 3002, message: 'Invalid Password'}
        res.status(400).send(rejJson);
        return;
    }

    if (username.length < 3 || username.length > 20 || !username.match("^[a-zA-Z0-9]*$")) {
        const rejJson = { type: 'error', code: 3003, message: 'Invalid Username'}
        res.status(400).send(rejJson);
        return;
    }

    const result = await createUser({ email, password, name: username }).catch((err) => {
        console.error(err);
        const rejJson = { type: 'error', code: 5001, message: 'Database Error'}
        res.status(500).json(rejJson);
        return;
    });

    if (result === null) {
        const rejJson = { type: 'error', code: 3201, message: 'User with email already exists'}
        res.status(400).json(rejJson);
        return;
    }

    res.status(200).json(result);
}