import jwt from 'jsonwebtoken';

export async function accessTokenGenerate(
  userData: {
    userId: string,
    email: string,
    name: string,
    role: string,
    userIdInPaymentSystem?: string,
  },
) {
  const accessToken = jwt.sign(
    userData,
    process.env.JWT_SECRET as string,
    {
      expiresIn: 3600, // 1 hora - em segundos
    },
  );

  return { accessToken };
}
