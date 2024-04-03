import * as postgres from '../database/postgres';

const CHARACTERS = '0123456789abcdefghijklmnopqrstuvwxyz';
const ID_LENGTH = 20;

async function generateUniqueUserId(): Promise<string> {
    let id = generateRandomId();
    while (await isUserIdExist(id)) {
        id = generateRandomId();
    }
    return id;
}

function generateRandomId(): string {
    let id = '';
    for (let i = 0; i < ID_LENGTH; i++) {
        id += CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
    }
    return id;
}

async function isUserIdExist(id: string): Promise<boolean> {
    const connection = await postgres.getConnection();
    const query = 'SELECT COUNT(*) FROM users WHERE userid = $1';
    const result = await connection.query<{ count: number }>(query, [id]);
    return result.rows[0].count > 0;
}

export { generateUniqueUserId };
