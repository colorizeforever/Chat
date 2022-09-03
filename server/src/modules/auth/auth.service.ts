import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AuthDocument, Authorization } from '../../schemas/auth.schema';
import { Model } from 'mongoose';
import { AuthDto } from '../../dto/auth.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { TokenType } from '../../typing/token.type';
import { Errors } from '../../constants/errors';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Authorization.name) private authModel: Model<AuthDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async login(authDto: AuthDto): Promise<TokenType> {
    const user = await this.validateUser(authDto);
    return this.generateToken(user);
  };

  async registration(authDto: AuthDto): Promise<TokenType> {
    const candidate = await this.getUserByLogin(authDto.login);
    if (candidate) {
      throw new Error(Errors.ALREADY_EXIST);
    }
    const hashPass = await bcrypt.hash(authDto.password, 4);
    const user = await new this.authModel({
      login: authDto.login,
      password: hashPass,
    }).save();
    return this.generateToken(user);
  };

  private async generateToken(user: Authorization): Promise<TokenType> {
    const payload = { login: user.login };
    return {
      token: this.jwtService.sign(payload),
    };
  };

  private async validateUser(authDto: AuthDto): Promise<Authorization> {
    const user = await this.getUserByLogin(authDto.login);
    if (!user) {
      throw new Error(Errors.NO_USER);
    }
    const passwordEquals = await bcrypt.compare(
      authDto.password,
      user.password,
    );

    if (passwordEquals) {
      return user;
    }
    throw new Error(Errors.WRONG_PASS);
  };

  private async getUserByLogin(login: string): Promise<Authorization> {
    return this.authModel.findOne({ login: login }).lean();
  };
}
