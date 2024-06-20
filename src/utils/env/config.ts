import env from 'env-var';

export const config = {
  databaseUrl: env.get('DATABASE_URL').required().asString(),
  jwtSecret: env.get('JWT_SECRET').required().asString(), 
  baseUrlApiPagarMe: env.get('BASE_URL_API_PAGARME').required().asString(),
  paymentAPiPublicKey: env.get('PAYMENT_API_PUBLIC_KEY').required().asString(),
  paymentApiKey: env.get('PAYMENT_API_KEY').required().asString(),
};