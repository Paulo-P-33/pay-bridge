import { Router } from 'express';
import { LoginController } from './login/login.controller';
import { LoginDto } from './login/login.dto';
import { validateMiddleware } from '@/middlewares/validator';

const authRoutes = Router();

authRoutes.post('/login', validateMiddleware(LoginDto) ,LoginController.execute);


export {authRoutes};