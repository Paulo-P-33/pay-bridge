import { validateSchema } from '@/middlewares/validator';
import { Router } from 'express';
import { CreateProductDTO } from './create/create-product.dto';
import { getAuthenticatedAdmin } from '@/middlewares/get-auth-admin';
import { CreateProductController } from './create/create-product.controller';
import { FindProductDTO } from './find/find-product.dto';
import { getAuthenticatedUser } from '@/middlewares/get-auth-user';
import { FindProductController } from './find/find-product.controller';
import { ListProductController } from './list/list-product.controller';
import { DeleteProductDTO } from './delete/delete-product.dto';
import { DeleteProductController } from './delete/delete-product.controller';
import { BodyUpdateProductDTO, ParamsUpdateProductDTO } from './update/update-product.dto';
import { UpdateProductController } from './update/update-product.controller';

const productRoutes = Router();

productRoutes.post('/create', validateSchema(CreateProductDTO), getAuthenticatedAdmin, CreateProductController.execute);

productRoutes.get('/find/:id', validateSchema(FindProductDTO, 'params'), getAuthenticatedUser, FindProductController.execute);

productRoutes.get('/list', getAuthenticatedUser, ListProductController.execute);

productRoutes.patch('/update/:id', validateSchema(ParamsUpdateProductDTO, 'params'), validateSchema(BodyUpdateProductDTO), getAuthenticatedAdmin, UpdateProductController.execute);

productRoutes.delete('/delete/:id', validateSchema(DeleteProductDTO, 'params'), getAuthenticatedAdmin, DeleteProductController.execute);
export {productRoutes};