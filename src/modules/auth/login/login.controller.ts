import { db } from '@/database/db-conn';
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';

export class LoginController {
  static async execute(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await db.user.findUnique({
      where: {
        email,
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
      },
    });

    if (!user) return res.status(404).json({message: 'User not found!'});

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({message: 'User or password invalid!'});
    };


    return res.status(200).json({
      result: {
        id: user.secureId,
        name: user.name,
        email: user.email,
        role: user.role.name,
        roleId: user.role.secureId,
      }});
  }
}