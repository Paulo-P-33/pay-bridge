import jwt from 'jsonwebtoken';

export async function accessTokenGenerate(
  userData: {
    id: string,
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
      expiresIn: 7200, // 2 horas - em segundos
    },
  );

  return { accessToken };
}
