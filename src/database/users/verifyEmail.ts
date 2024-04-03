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

export async function verifyEmail(token: string): Promise<types.User | null> {
    const connection = await postgres.getConnection();

    const query = 'SELECT * FROM email_verification WHERE token = $1';
    const result = await connection.query<{ userid: string }>(query, [token]);

    if (result.rows.length === 0) {
        return null;
    }

    const userid = result.rows[0].userid;

    const updateQuery = 'UPDATE users SET email_verified = true, role = $1 WHERE userid = $2';
    await connection.query(updateQuery, ['user', userid]);

    const deleteQuery = 'DELETE FROM email_verification WHERE userid = $1';
    await connection.query(deleteQuery, [userid]);

    const userQuery = 'SELECT * FROM users WHERE userid = $1';
    const userResult = await connection.query<UserRow>(userQuery, [userid]);

    if (userResult.rows.length === 0) {
        return null;
    }

    const userRow = userResult.rows[0];
    const user: types.User = {
        id: userRow.userid,
        name: userRow.username,
        email: userRow.email,
        role: userRow.role,
        emailVerified: userRow.email_verified,
        beatLeaderLink: userRow.beatleader_link || '',
        scoreSaberLink: userRow.scoresaber_link || ''
    };

    return user;
}