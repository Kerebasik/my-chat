import { IsEmail, Length, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Должно быть строкой' })
  @IsEmail({}, { message: 'Некорректный email' })
  readonly email: string;

  @IsString({ message: 'Должно быть строкой' })
  @Length(6, 26, { message: 'Не меньше 4 и не больше 16' })
  readonly password: string;
}
