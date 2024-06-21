import { config } from '@/utils/env/config';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const getAuthenticatedAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.headers.cookie ? req.headers.cookie : '';
  
  const [, token] = accessToken.split('accessToken=');
  
  try {
    const decodedUser = jwt.verify(token, config.jwtSecret) as Record<string, unknown>;

    if (decodedUser['role'] !== 'ADMIN') {
      return res.status(403).json({message: 'Request Forbidden!'});
    }

    req.user = decodedUser as Record<string, unknown>;
    return next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({message: 'Unauthorized'});
  }
};