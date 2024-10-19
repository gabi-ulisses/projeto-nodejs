import { User } from './../models/User';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const ensureAuth = (request: Request, response: Response, next: NextFunction) => {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        return response.status(401).json({ error: 'JWT token is missing' });
    }

    const [_, token] = authHeader.split(' ');

    try {
        const decoded = jwt.verify(token, 'your-256-bit-secret');
        request.User = decoded; // Você pode adicionar as informações decodificadas ao objeto request
        next();
    } catch (err) {
        return response.status(401).json({ error: 'Invalid JWT token' });
    }
};

export default ensureAuth;
