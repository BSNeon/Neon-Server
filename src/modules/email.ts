import { Resend } from 'resend';
import * as emails from '../emails/emails';
import * as types from '../types/types';
import { generateToken } from '../helpers/tokenGen';
import * as postgres from '../database/postgres';

export async function sendVerifyEmail(user: types.User): Promise<void> {
    const resend = new Resend(process.env.RESEND_KEY);

    const token = await generateToken();

    await postgres.createVerification(user.id, token);

    const url = `${process.env.BACKEND_URL}/user/verify/${token}`;
    const emailTemplate = emails.getVerificationEmail(url);

    await resend.emails.send({
        from: 'Neon <noreply@neon.jnwh.tech>',
        to: user.email,
        subject: 'Verify your email',
        html: emailTemplate,
        tags: [{
            name: 'category',
            value: 'confirm_email'
        }],
    });
}