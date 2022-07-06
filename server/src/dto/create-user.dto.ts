import { IsString, Length } from "class-validator";

export class CreateUserDto {
  @IsString({ message: 'Should be string' })
  @Length(4, 16, {
    message: 'Should be less then 16 symbols and bigger then 4',
  })
  readonly login: string;
  @IsString({ message: 'Should be string' })
  @Length(4, 16, {
    message: 'Should be less then 16 symbols and bigger then 4',
  })
  readonly password: string;
}