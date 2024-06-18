import express, {NextFunction} from 'express';
import {IncomingMessage,Server, ServerResponse} from 'http';
import { routes } from './main.routes';


export const createMainServer = async (): Promise<Server<typeof IncomingMessage, typeof ServerResponse>> => {
  const app = express();
  app.use(express.json());
  app.use(routes);
  app.use(
    (
      err: any,
      _req: express.Request,
      res: express.Response,
      _next: NextFunction,
    ) => {
      console.error(err);
      return res.status(err['status'] || 500).json({
        message: err.message || 'Internal server error',
        status: err['status'] || 500,
      });
    },
  );
  
  return app.listen(3333, () => console.log('Server is running!'));
};
