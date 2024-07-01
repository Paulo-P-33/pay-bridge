import { db } from '@/database/db-conn';
import { Request, Response } from 'express';

export class DeleteProductController {
  static async execute(req: Request, res: Response){
    const productId = req.params.id;

    const product = await db.product.findUnique({
      where: {
        secureId: productId,
      },
    });

    if (!product) return res.status(404).json({message: 'Product not found!'});

    await db.product.delete({
      where: {
        id: product.id,
      },
    });

    return res.status(200).send();
  };
}