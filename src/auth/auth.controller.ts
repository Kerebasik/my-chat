import { Body, Controller, HttpStatus, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('log-in')
  @HttpCode(HttpStatus.OK)
  login(@Body() userDto: CreateUserDto) {
    return this.authService.login(userDto);
  }

  @Post('sign-up')
  async signup(@Body() userDto: CreateUserDto) {
    await this.authService.signup(userDto);
  }
}
