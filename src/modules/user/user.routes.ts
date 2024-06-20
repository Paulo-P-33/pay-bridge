import { validateSchema } from '@/middlewares/validator';
import { Router } from 'express';
import { UserDTO } from './create/user.dto';
import { CreateUserController } from './create/create-user.controller';

const userRoutes = Router();

userRoutes.post('/create', validateSchema(UserDTO), CreateUserController.execute);

export {userRoutes};