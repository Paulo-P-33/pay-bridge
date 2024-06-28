import { config } from '@/utils/env/config';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const getAuthenticatedUser = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.headers.cookie ? req.headers.cookie : '';
  
  const [, token] = accessToken.split('accessToken=');
  
  try {
    const decodedUser = jwt.verify(token, config.jwtSecret) as Record<string, unknown>;

    req.user = decodedUser;
    return next();
  } catch (error) {
    return res.status(401).json({message: 'Unauthorized'});
  }
};