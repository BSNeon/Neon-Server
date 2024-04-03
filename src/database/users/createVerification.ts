import * as postgres from '../postgres';

export async function createVerification(userid: string, token: string): Promise<void> {
    const connection = await postgres.getConnection();
    const query = 'INSERT INTO email_verification (userid, token) VALUES ($1, $2)';
    await connection.query(query, [userid, token]);
    return;
}