import { Body, Controller, Post, Req, UseInterceptors } from '@nestjs/common';
import { Request } from 'express';
import MongooseClassSerializerInterceptor from '../interceptors/mongoose-class-serializer.interceptor';
import { User } from '../user/entities/user.entity';
import { AuthService } from './auth.service';
import { CodeDto } from './dtos/code.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseInterceptors(MongooseClassSerializerInterceptor(User))
  @Post('google-login')
  async googleLogin(@Body() codeDto: CodeDto, @Req() request: Request) {
    const user = await this.authService.loginWithGoogle(codeDto);
    const cookie = this.authService.getCookieWithAccessToken(user.id);
    request.res.setHeader('Set-Cookie', cookie);
    return user;
  }
}
