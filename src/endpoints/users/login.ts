import express from 'express';
import * as postgres from '../../database/postgres';
import * as types from '../../types/types';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface UserRow {
    userid: string;
    username: string;
    email: string;
    password: string;
    email_verified: boolean;
    role: 'admin' | 'user' | 'unverified';
    beatleader_link?: string | null;
    scoresaber_link?: string | null;
}

export async function handleLogin(req: express.Request, res: express.Response) {
    if (!req.body ||!req.body.email || req.body.password) {
        const rejJson = { type: 'error', code: 3011, message: 'Bad Request' }
        res.status(400).json(rejJson);
        return;
    }

    const body = req.body;
    const email = body.email;
    const password = body.password;

    const user: any = await postgres.getUserByEmail(email).catch((err) => {
        console.error(err);
        const rejJson = { type: 'error', code: 5001, message: 'Database Error'}
        res.status(500).json(rejJson);
        return;
    });

    if (!user) {
        const rejJson = { type: 'error', code: 3202, message: 'Credentials not found!'}
        res.status(401).json(rejJson);
        return;
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        const rejJson = { type: 'error', code: 3202, message: 'Credentials not found!'}
        res.status(401).json(rejJson);
        return;
    }

    const token = jwt.sign({ id: user.userid }, process.env.JWT_SECRET, { expiresIn: '30d' });

    res.cookie('token', token, { httpOnly: true, sameSite: 'strict', secure: true });

    res.status(200).json({ type: 'success', code: 2001, message: 'Logged in successfully!', data: { token: token }});
}