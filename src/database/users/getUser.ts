import * as postgres from '../postgres';
import * as types from '../../types/types';

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

async function fetchUserByQuery(query: string, params: any[]): Promise<types.User | null> {
    const connection = await postgres.getConnection();

    const result = await connection.query<UserRow>(query, params);

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

    return user;
}

export async function getUserByEmail(email: string): Promise<types.User | null> {
    const query = 'SELECT * FROM users WHERE email = $1';
    return fetchUserByQuery(query, [email]);
}

export async function getUserById(userid: string): Promise<types.User | null> {
    const query = 'SELECT * FROM users WHERE userid = $1';
    return fetchUserByQuery(query, [userid]);
}
