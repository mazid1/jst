import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { EnvironmentVariables } from '../../config/environment-variables.interface';
import { UserService } from '../../user/user.service';
import { TokenPayloadDto } from '../dtos/token-playload.dto';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
    private readonly userService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.Authentication;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get('NX_JWT_ACCESS_TOKEN_SECRET'),
    });
  }

  async validate(payload: TokenPayloadDto) {
    try {
      const user = await this.userService.findById(payload.userId);
      if (!user) {
        throw new UnauthorizedException();
      }
      return user;
    } catch (error) {
      this.logger.log(error);
      throw new UnauthorizedException();
    }
  }
}
