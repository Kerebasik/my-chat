import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: CreateUserDto): Promise<{ access_token: string }> {
    const user = await this.usersService.user({ email: userDto.email });

    if (!user) {
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    }

    const isPassValid = await bcrypt.compare(userDto.password, user.password);

    if (!isPassValid) {
      throw new HttpException('Password Not Match', HttpStatus.UNAUTHORIZED);
    }

    const payload = { id: user.id, email: user.email };

    return { access_token: await this.jwtService.signAsync(payload) };
  }

  async signup(userDto: CreateUserDto) {
    const hashPass = await bcrypt.hash(userDto.password, 12);
    await this.usersService.create({ ...userDto, password: hashPass });
  }
}
