import { Router } from 'express';
import { authRoutes } from './modules/auth/auth.routes';
const routes = Router();

routes.use('/auth', authRoutes);

routes.get('/', async (req, res) => {
  return res.status(200).json({message: 'OK'});
});


export { routes };