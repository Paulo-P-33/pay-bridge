import { Request, Response } from 'express';
import { db } from '@/database/db-conn';
import { config } from '@/utils/env/config';
import { UserDTO } from './user.dto';
import bcrypt from 'bcryptjs';


export class CreateUserController {
  static async execute(req: Request, res: Response) {
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const user = new UserDTO({...req.body, 
      password: hashPassword,
    });
    
    if(
      (await db.user.findUnique({where: {email: user.email}}))
    ) {
      return res.status(409).json({error: 'User already existing!'});
    };
    
    
    
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: 'Basic ' + Buffer.from(config.paymentApiKey).toString('base64'),
      },
      body: JSON.stringify({...user, 
        document_type: user.documentType,
        address: {
          ...user.address,
          zip_code: user.address?.zipCode,
          line_1: user.address?.numberAndStreet,
          line_2: user.address?.complement,
        },
        phones: {
          home_phone: user.homePhone ? {
            country_code: user.homePhone?.countryCode, 
            area_code: user.homePhone?.areaCode, 
            number: user.homePhone?.number,
          } : null,
          mobile_phone:user.mobilePhone ? {
            country_code: user.mobilePhone?.countryCode, 
            area_code: user.mobilePhone?.areaCode, 
            number: user.mobilePhone?.number,
          } : null,
        },
      }),
    };

    let apiValidationErrors;
    
    const resultRequest = await fetch(`${config.baseUrlApiPagarMe}/customers`, options);
    
    if (resultRequest.status === 422) {
      await resultRequest.json().then(response => {
        apiValidationErrors = {message: response.message, errors: response.errors};
      });
      return res.status(400).json(apiValidationErrors);

    } 
    
    if (resultRequest.status === 200) {
      const { id: userIdInPaymentSystem } = await resultRequest.json();

      await db.user.create({
        data: {
          name: user.name,
          email: user.email,
          password: user.password,
          userIdInPaymentSystem: userIdInPaymentSystem,
          roleId: 2,
        },
      });
      
    }
    
    return res.status(201).send();
  }
}