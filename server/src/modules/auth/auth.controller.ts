import {
  Body,
  Controller, Get,
  HttpException, HttpStatus, Param,
  Post, Res,
  UnauthorizedException, UploadedFile,
  UseFilters, UseInterceptors
} from "@nestjs/common";
import { AuthService } from './auth.service';
import { CreateUserDto } from '../../dto/create-user.dto';
import { TokenType } from '../../typing/token.type';
import { ExceptionsFilter } from '../../exceptions/FilterException';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registration')
  @UseFilters(ExceptionsFilter)
  registration(@Body() authDto: CreateUserDto): Promise<TokenType> {
    return this.authService.registration(authDto);
  };

  @Post('login')
  @UseFilters(ExceptionsFilter)
  login(@Body() authDto: CreateUserDto): Promise<TokenType> {
    return this.authService.login(authDto);
  };


}
