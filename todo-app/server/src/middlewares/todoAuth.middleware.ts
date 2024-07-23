// todoAuthMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest } from '../types/express';

export const todoAuthMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    req.userId = undefined;
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string, username: string };
    req.userId = decoded.userId;
    req.username = decoded.username;
    next();
  } catch (error) {
    req.userId = undefined;
    next();
  }
};