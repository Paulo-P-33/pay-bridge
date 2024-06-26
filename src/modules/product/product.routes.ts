import { validateSchema } from '@/middlewares/validator';
import { Router } from 'express';
import { CreateProductDTO } from './create/create-product.dto';
import { getAuthenticatedAdmin } from '@/middlewares/get-auth-admin';
import { CreateProductController } from './create/create-product.controller';
import { FindProductDTO } from './find/find-product.dto';
import { getAuthenticatedUser } from '@/middlewares/get-auth-user';
import { FindProductController } from './find/find-product.controller';
import { ListProductController } from './list/list-product.controller';

const productRoutes = Router();

productRoutes.post('/create', validateSchema(CreateProductDTO), getAuthenticatedAdmin, CreateProductController.execute);

productRoutes.get('/find/:id', validateSchema(FindProductDTO, 'params'), getAuthenticatedUser, FindProductController.execute);

productRoutes.get('/list', getAuthenticatedUser, ListProductController.execute);
export {productRoutes};