import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { EnvironmentVariables } from '../config/environment.variable';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>
  ) {
    super({
      clientID: configService.get('GOOGLE_AUTH_CLIENT_ID', { infer: true }),
      clientSecret: configService.get('GOOGLE_AUTH_CLIENT_SECRET', {
        infer: true,
      }),
      callbackURL: configService.get('GOOGLE_CALLBACK_URL', { infer: true }),
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any
  ): Promise<any> {
    console.log(accessToken, refreshToken, profile);
    if (!profile) {
      throw new UnauthorizedException();
    }
    const { name, emails, photos } = profile;
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
    };
    return user;
  }
}
