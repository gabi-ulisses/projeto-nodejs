import { connection } from './conecction';

export const createUserTable = async () => {
    const databaseClient = await connection();

    await databaseClient.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
        )
    `);
    
    console.log('Tabela de usuários criada com sucesso');
};
