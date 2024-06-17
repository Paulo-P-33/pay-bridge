import { Router } from 'express';
const routes = Router();

routes.get('/', async (req, res) => {
  return res.status(200).json({message: 'OK'});
});


export { routes };