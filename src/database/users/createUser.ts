import * as postgres from '../postgres';
import * as types from '../../types/types';
import * as bcrypt from 'bcrypt';
import { generateUniqueUserId } from '../../helpers/idGen';
import * as emails from '../../modules/email';

interface UserCreationParams {
    email: string;
    password: string;
    name: string;
}

interface UserCreationResult {
    userid: string;
    username: string;
    email: string;
    email_verified: boolean;
    role: 'admin' | 'user' | 'unverified';
    beatleader_link?: string | null;
    scoresaber_link?: string | null;
}

export async function createUser({ email, password, name }: UserCreationParams): Promise<types.User | null> {
    const connection = await postgres.getConnection();

    if (await isEmailTaken(email, connection)) {
        return null;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const id = await generateUniqueUserId();

    const query = `
        INSERT INTO users (userid, username, email, password, email_verified, role)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
    `;
    
    const result = await connection.query<UserCreationResult>(query, [id, name, email, hashedPassword, false, 'unverified']);

    if (result.rows.length === 0) {
        return null;
    }

    const row = result.rows[0];
    const user: types.User = {
        id: row.userid,
        name: row.username,
        email: row.email,
        role: row.role,
        emailVerified: row.email_verified,
        beatLeaderLink: row.beatleader_link || '',
        scoreSaberLink: row.scoresaber_link || ''
    };

    await emails.sendVerifyEmail(user);

    return user;
}

async function isEmailTaken(email: string, connection: any): Promise<boolean> {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await connection.query(query, [email]);
    return result.rows.length > 0;
}
