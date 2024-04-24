import express from 'express';
import { register, login } from '../controllers/authentication';
import router from '.';

export default (router: express.Router) => {
    router.post('/auth/register', register);
    router.post('/auth/login', login);
}