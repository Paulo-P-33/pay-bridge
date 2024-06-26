import { Router } from 'express';
import { authRoutes } from './modules/auth/auth.routes';
import { userRoutes } from './modules/user/user.routes';
import { productRoutes } from './modules/product/product.routes';
const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/user', userRoutes);
routes.use('/product', productRoutes);

routes.get('/', async (req, res) => {
  return res.status(200).json({message: 'OK'});
});


export { routes };