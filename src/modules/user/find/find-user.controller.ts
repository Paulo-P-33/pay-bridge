import { db } from '@/database/db-conn';
import { getAuthCostumer } from '@/services/pagarme/customer/get-auth-customer';
import { Request, Response } from 'express';

export class FindUserController {
  static async execute(req: Request, res: Response){
    const authUser = await db.user.findUnique({
      where: {
        secureId: req.user.id as string,
      },
      select: {
        secureId: true,
        userIdInPaymentSystem: true,
        name: true,
        email: true,
        password: true,
        role: {
          select: {
            name: true,
            secureId: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });
  
    if (!authUser) return res.status(404).json({message: 'User not found!'});

    const user = await getAuthCostumer(authUser.userIdInPaymentSystem as string);

    
    return res.status(200).json(user ? {id: req.user.id,...user } : {
      id: authUser.secureId,
      name: authUser.name,
      email: authUser.email,
      role: authUser.role.name,
      roleId: authUser.role.secureId,
      createdAt: authUser.createdAt,
      updatedAt: authUser.updatedAt,
    });
  }
}