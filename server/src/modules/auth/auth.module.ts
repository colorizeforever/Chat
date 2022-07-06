import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Authorization, AuthSchema } from '../../schemas/auth.schema';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from "dotenv";

dotenv.config()

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
  ],
  imports: [
    MongooseModule.forFeature([
      { name: Authorization.name, schema: AuthSchema },
    ]),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY,
    })
  ],
  exports: [
    AuthService
  ]
})

export class AuthModule {}
