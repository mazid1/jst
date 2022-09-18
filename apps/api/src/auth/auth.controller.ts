import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import MongooseClassSerializerInterceptor from '../interceptors/mongoose-class-serializer.interceptor';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { CodeDto } from './dtos/code.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import JwtRefreshGuard from './guards/jwt-refresh.guard';
import RequestWithUser from './interfaces/request-with-user.interface';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) {}

  @UseInterceptors(MongooseClassSerializerInterceptor(User))
  @Post('google-login')
  @HttpCode(200)
  async googleLogin(@Body() codeDto: CodeDto, @Req() request: Request) {
    const user = await this.authService.loginWithGoogle(codeDto);

    const accessTokenCookie = this.authService.getCookieWithAccessToken(
      user.id
    );
    const { cookie: refreshTokenCookie, token: refreshToken } =
      this.authService.getCookieWithRefreshToken(user.id);

    await this.usersService.setCurrentRefreshToken(refreshToken, user.id);

    request.res.setHeader('Set-Cookie', [
      accessTokenCookie,
      refreshTokenCookie,
    ]);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @HttpCode(200)
  async logOut(@Req() request: RequestWithUser) {
    await this.usersService.removeRefreshToken(request.user.id);
    request.res.setHeader('Set-Cookie', this.authService.getCookiesForLogOut());
  }

  @UseInterceptors(MongooseClassSerializerInterceptor(User))
  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  refresh(@Req() request: RequestWithUser) {
    const { user } = request;

    const accessTokenCookie = this.authService.getCookieWithAccessToken(
      user.id
    );
    const { cookie: refreshTokenCookie, token: refreshToken } =
      this.authService.getCookieWithRefreshToken(user.id);

    this.usersService.setCurrentRefreshToken(refreshToken, user.id);

    request.res.setHeader('Set-Cookie', [
      accessTokenCookie,
      refreshTokenCookie,
    ]);
    return user;
  }
}
