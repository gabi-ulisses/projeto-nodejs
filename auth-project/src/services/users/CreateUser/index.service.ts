import crypto from 'crypto-js';
import { v4 } from "uuid";
import { RequestData } from "./types";
import { connection } from '../../../database/conecction';
import jwt from 'jsonwebtoken';

class CreateUserService {
    // Método estático para criar um usuário a partir dos dados da requisição
    public static async create(requestData: RequestData) {
        const service = new CreateUserService();
        return await service.execute(requestData);
    }

    // Método privado para executar a criação do usuário
    private async execute(requestData: RequestData) {
        // Cria os dados do usuário, incluindo um ID único e uma senha encriptada
        const userData = {
            ...requestData, 
            password: this.encryptPassword(requestData.password),
            userId: v4()
        };

        // Salva os dados do usuário no banco de dados
        await this.saveToDatabase(userData);

        // Gera o token JWT
        const token = this.generateToken(userData);

        return { userData, token };
    }

    // Método privado para encriptar a senha usando SHA-256
    private encryptPassword(password: string) {
        return crypto.SHA256(password).toString(crypto.enc.Hex);
    }

    // Método privado para salvar os dados do usuário no banco de dados
    private async saveToDatabase(userData: any) {
        const db = await connection();
        await db.run(`
            INSERT INTO users (userId, name, email, password)
            VALUES (?, ?, ?, ?)
        `, [userData.userId, userData.name, userData.email, userData.password]);

        console.log('Usuário salvo no banco de dados com sucesso.');
    }
// yarn add jsonwebtoken
// yarn add @types/jsonwebtoken -D

    // Método privado para gerar o token JWT
    private generateToken(userData: any) {
        const secretKey = 'your-256-bit-secret';
        const token = jwt.sign(
            { userId: userData.userId, email: userData.email },
            secretKey,
            { expiresIn: '1h' }
        );
        return token;
    }
}

export default CreateUserService;