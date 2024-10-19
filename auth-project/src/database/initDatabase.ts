import { createUserTable } from './userTable';

const initializeDatabase = async () => {
    try {
        await createUserTable();
        console.log('Banco de dados inicializado com sucesso');
    } catch (error) {
        console.error('Erro ao inicializar o banco de dados:', error);
    }
};

initializeDatabase();
