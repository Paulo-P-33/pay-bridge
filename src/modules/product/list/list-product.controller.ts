import { db } from '@/database/db-conn';
import { Request, Response } from 'express';

export class ListProductController {
  static async execute(req: Request, res: Response) {
    const products = await db.product.findMany({
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
    }); 
    
    return res.status(200).send(products.map((product) => ({
      id: product.secureId,
      name: product.name,
      amount: product.amount,
      code: product.code,
      description: product.description,
      quantity: product.quantity,
      category: product.category.name.toUpperCase(),
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    })));
  }
}