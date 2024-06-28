import { config } from '@/utils/env/config';

export type CustomerOutput = {
  id?: string;
  userIdInPaymentSystem: string;
    name: string;
    email: string;
    gender: string;
    delinquent: boolean;
    address: {
      id : string;
      numberAndStreet: string;
      complement: string;
      zipCode: string;
      city: string;
      state: string;
      country: string;
    };
    birthdate: string;
    phones?: {
      homePhone?: {
        countryCode: string;
        number:string;
        areaCode: string;
      },
      mobilePhone?: {
        countryCode: string;
        number: string;
        areaCode: string;
      },
    };
    createdAt?: string;
    updatedAt?: string;
};

export type BodyError = {statusCode: number, message:string, errors: unknown};

export async function getAuthCostumer(id: string): Promise<CustomerOutput | null>{
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization: 'Basic ' + Buffer.from(config.paymentApiKey).toString('base64'),
    },
  };
  
  const reqResult = await fetch(`${config.baseUrlApiPagarMe}/customers/${id}`, options);


  if (reqResult.status !== 200) {
    return null;
  } 
  
  const user = await reqResult.json();
  
  return {
    userIdInPaymentSystem: user.id,
    name: user.name,
    email: user.email,
    gender: user.gender,
    delinquent: user.delinquent,
    address: {
      id : user.address.id,
      numberAndStreet: user.address.line_1,
      complement: user.address.line_2,
      zipCode: user.address.zip_code,
      city: user.address.city,
      state: user.address.state,
      country: user.address.country,
    },
    birthdate: user.birthdate,
    phones: {
      ...(user.phones.home_phone ? {
        homePhone: {
          countryCode: user.phones.home_phone.country_code,
          number: user.phones.home_phone.number,
          areaCode: user.phones.home_phone.area_code,
        },
      }: null),
      ...(user.phones.mobile_phone ? {
        mobilePhone: {
          countryCode: user.phones.mobile_phone.country_code,
          number: user.phones.mobile_phone.number,
          areaCode: user.phones.mobile_phone.area_code,
        },
      }: null),
    },
    createdAt: user.created_at,
    updatedAt: user.updated_at,
  };
}