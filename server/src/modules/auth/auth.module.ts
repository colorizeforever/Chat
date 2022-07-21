import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Authorization, AuthSchema } from '../../schemas/auth.schema';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from "../../config/configuration";

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
  ],
  imports: [
    MongooseModule.forFeature([
      { name: Authorization.name, schema: AuthSchema },
    ]),
    JwtModule.register(jwtConfig)
  ],
  exports: [
    AuthService
  ]
})

export class AuthModule {}
