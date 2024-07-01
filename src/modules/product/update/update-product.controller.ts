import { db } from '@/database/db-conn';
import { Request, Response } from 'express';
import { BodyUpdateProductDTO } from './update-product.dto';

export class UpdateProductController { 
  static async execute(req: Request, res: Response) {
    const productId = req.params.id;

    const product = await db.product.findUnique({
      where: {
        secureId: productId,
      },
    });

    if (!product) return res.status(404).json({message: 'Product not found!'});

    const productUpdated: Partial<BodyUpdateProductDTO> = {...req.body};

    const category = await db.category.findFirst({
      where: {
        name: {
          contains: productUpdated.category,
          mode: 'insensitive',
        },
      },
      select: {
        id: true,
      },
    });

    if (!category) return res.status(400).json({message: 'Invalid Category!'});

    await db.product.update({
      where: {
        id: product.id,
      },
      data: {
        name: productUpdated.name || product.name,
        amount: productUpdated.amount || product.amount,
        code: productUpdated.code || product.code,
        description: productUpdated.description || product.description,
        quantity: productUpdated.quantity || product.quantity,
        categoryId: category.id || product.categoryId,
      },
    });

    return res.status(200).send();
  }
}