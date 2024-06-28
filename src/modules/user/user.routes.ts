import { validateSchema } from '@/middlewares/validator';
import { Router } from 'express';
import { UserDTO } from './create/user.dto';
import { CreateUserController } from './create/create-user.controller';
import { getAuthenticatedUser } from '@/middlewares/get-auth-user';
import { FindUserController } from './find/find-user.controller';

const userRoutes = Router();

userRoutes.post('/create', validateSchema(UserDTO), CreateUserController.execute);
userRoutes.get('/find', getAuthenticatedUser, FindUserController.execute);

export {userRoutes};