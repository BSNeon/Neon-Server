import * as postgres from 'pg';

let client: postgres.Client;

export async function connect() {
    let connectionString = process.env.DATABASE_URL;

    client = new postgres.Client({
        connectionString: connectionString,
    });
    await client.connect().catch((err) => {
        console.error('Error connecting to Postgres', err);
    });
    await createTables();
}

async function checkConnection() {
    if (!client) {
        await connect();
    }

    await client.query('SELECT 1').catch(async () => {
        await connect();
    });

    return true;
}

export async function getConnection() {
    await checkConnection();
    return client;
}

async function createTables() {
    const cclient = await getConnection();
    
    await cclient.query(`
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            userid VARCHAR(255) NOT NULL,
            username VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            email_verified BOOLEAN NOT NULL,
            role VARCHAR(255) NOT NULL,
            beatleader_link TEXT,
            scoresaber_link TEXT
        );
    `).catch((err) => {
        console.error('Error creating table users', err);
    });
}