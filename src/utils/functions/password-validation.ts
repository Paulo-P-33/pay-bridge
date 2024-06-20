import { instanceToPlain } from 'class-transformer';
import {  registerDecorator, ValidationArguments,
  ValidationOptions} from 'class-validator';

export function PasswordValidation(
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string): void {
    registerDecorator({
      name: 'PasswordValidation',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: string) {
          const regExp =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]*).{8,}$/;

          const validationConfirm = regExp.test(value);
  
          return validationConfirm;
        },
      },
    });
  };
}


export function EqualsTo(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string): void {
    registerDecorator({
      name: 'equalsTo',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: unknown, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = instanceToPlain(args.object)[relatedPropertyName];

          return value === relatedValue;
        },
        defaultMessage(args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;

          return `${propertyName} must be equal to ${relatedPropertyName}`;
        },
      },
    });
  };
}