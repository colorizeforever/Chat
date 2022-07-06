import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { Errors } from '../constants/errors';

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const errorMsg = exception.message;
    const status =
      {
        [Errors.NO_USER]: HttpStatus.BAD_REQUEST,
        [Errors.WRONG_PASS]: HttpStatus.FORBIDDEN,
        [Errors.ALREADY_EXIST]: HttpStatus.CONFLICT,
      }[exception.message] || HttpStatus.BAD_REQUEST;

    response.status(status).json({
      statusCode: status,
      message: errorMsg,
    });
  }
}
