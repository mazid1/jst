import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './google-auth.guard';
import { GoogleStrategy } from './google.strategy';

@Module({
  imports: [PassportModule],
  providers: [AuthService, GoogleStrategy, GoogleAuthGuard],
  controllers: [AuthController],
})
export class AuthModule {}
