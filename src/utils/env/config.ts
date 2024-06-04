import env from 'env-var'

export const config = {
  paymentAPiPublicKey: env.get('PAYMENT_API_PUBLIC_KEY').required().asString(),
  paymentApiKey: env.get('PAYMENT_API_KEY').required().asString() 
}