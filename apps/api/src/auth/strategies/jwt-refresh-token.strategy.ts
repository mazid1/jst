import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { UserService } from '../../user/user.service';
import { EnvironmentVariables } from '../../config/environment-variables.interface';
import { TokenPayloadDto } from '../dtos/token-playload.dto';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token'
) {
  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
    private readonly userService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.Refresh;
        },
      ]),
      secretOrKey: configService.get('NX_JWT_REFRESH_TOKEN_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: TokenPayloadDto) {
    const refreshToken = request.cookies?.Refresh;
    const user = await this.userService.getUserIfRefreshTokenMatches(
      refreshToken,
      payload.userId
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
