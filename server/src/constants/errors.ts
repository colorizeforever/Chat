import {BadRequestException} from "@nestjs/common";

export enum Errors {
  NO_USER = 'User does not exist',
  WRONG_PASS = 'Password is wrong',
  ALREADY_EXIST = 'You need to be more creative(user with that login already exist)',
  SMTHNG_WENT_WRNG = 'Something went wrong'
}

export function ErrorThrower(error) {
  throw new BadRequestException({message: error})
}