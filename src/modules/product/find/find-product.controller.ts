import { db } from '@/database/db-conn';
import { Request, Response } from 'express';

export class FindProductController {
  static async execute(req: Request, res: Response){
    const productId = req.params.id;

    const product = await db.product.findUnique({
      where: {
        secureId: productId,
      },
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!product) return res.status(404).json({message: 'Product not found!'});

    return res.status(200).json({
      id: product.secureId,
      name: product.name,
      amount: product.amount,
      code: product.code,
      description: product.description,
      quantity: product.quantity,
      category: product.category.name.toUpperCase(),
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    });
  };
}