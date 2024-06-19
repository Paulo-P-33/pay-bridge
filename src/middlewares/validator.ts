import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';

import { plainToInstance } from 'class-transformer';


export function validateSchema(ClassType: any, partsRequest: string = 'body') {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const input = plainToInstance(ClassType, req[`${partsRequest}` as 'body']);
    const errors = await validate(input);
    if (errors.length > 0) {

      const errorMessages = errors.map((err) => {
        return { 
          property: err.property, 
          constraints: err.children?.length as number > 0 
            ? err.children?.map((error) => error.constraints) // Linha que checa validação aninhada
            : err.constraints};
      });
      
      res.status(400).json({ validationErrors: errorMessages });
      return;
    }

    next();
  };
}