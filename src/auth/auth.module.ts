import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import * as process from 'node:process';

const ACCESS_SECRET_KEY = process.env.ACCESS_SECRET_KEY;

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: ACCESS_SECRET_KEY,
      signOptions: { expiresIn: '1h' },
      verifyOptions: { clockTimestamp: 0 },
    }),
  ],
})
export class AuthModule {}
