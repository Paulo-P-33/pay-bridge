import { Router } from 'express';
import { LoginController } from './login/login.controller';
import { LoginDto } from './login/login.dto';
import { validateSchema } from '@/middlewares/validator';

const authRoutes = Router();

authRoutes.post('/login', validateSchema(LoginDto) ,LoginController.execute);


export {authRoutes};