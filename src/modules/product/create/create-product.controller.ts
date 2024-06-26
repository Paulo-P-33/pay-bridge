import { Request, Response } from 'express';
import { CreateProductDTO } from './create-product.dto';
import { db } from '@/database/db-conn';

export class CreateProductController {
  static async execute(req: Request, res: Response) {

    const product = new CreateProductDTO({...req.body});

    const categoryId = await db.category.findFirst({
      where: {
        name: {
          contains: product.category,
          mode: 'insensitive',
        },
      },
      select: {
        id: true,
      },
    });

    if (!categoryId) return res.status(400).json({message: 'Invalid Category!'});


    await db.product.create({
      data: {
        name: product.name,
        amount: product.amount,
        code: product.code,
        description: product.description,
        quantity: product.quantity,
        categoryId: categoryId.id,
      },
    });

    return res.status(201).send();
  }
  
}