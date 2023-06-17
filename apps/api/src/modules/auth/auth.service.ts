import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Auth, google } from 'googleapis';
import { EnvironmentVariables } from '../../config/environment-variables.interface';
import { CreateGoogleUserDto } from '../users/dtos/create-google-user.dto';
import { GoogleUsersService } from '../users/google-users.service';
import { UsersService } from '../users/users.service';
import { CodeDto } from './dtos/code.dto';
import { TokenPayloadDto } from './dtos/token-playload.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  oauth2Client: Auth.OAuth2Client;

  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
    private readonly googleUsersService: GoogleUsersService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {
    const clientId = this.configService.get('NX_GOOGLE_CLIENT_ID');
    const clientSecret = this.configService.get('NX_GOOGLE_CLIENT_SECRET');
    this.oauth2Client = new google.auth.OAuth2(
      clientId,
      clientSecret,
      'postmessage'
    );
  }

  async loginWithGoogle(codeDto: CodeDto) {
    const { code } = codeDto;
    try {
      const tokenResponse = await this.oauth2Client.getToken(code);
      this.oauth2Client.setCredentials(tokenResponse.tokens);

      const userInfoResponse = await google
        .oauth2('v2')
        .userinfo.get({ auth: this.oauth2Client });

      const googleUserData = userInfoResponse.data;

      const googleUserFromDB =
        await this.googleUsersService.findOneAndUpdateOrCreate({
          ...(googleUserData as CreateGoogleUserDto),
          externalId: googleUserData.id,
          tokens: { ...tokenResponse.tokens },
        });

      const userFromDB = await this.usersService.findOneOrCreate({
        name: googleUserFromDB.name,
        email: googleUserFromDB.email,
        picture: googleUserFromDB.picture,
        googleUser: googleUserFromDB.id,
      });

      return userFromDB;
    } catch (error) {
      this.logger.log(error);
    }
  }

  getCookieWithAccessToken(userId: string) {
    const payload: TokenPayloadDto = { userId };
    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; HttpOnly; Path=/; Secure; Max-Age=${this.configService.get(
      'NX_JWT_ACCESS_TOKEN_EXPIRATION_TIME'
    )}`;
  }

  getCookieWithRefreshToken(userId: string) {
    const payload: TokenPayloadDto = { userId };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('NX_JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'NX_JWT_REFRESH_TOKEN_EXPIRATION_TIME'
      )}s`,
    });
    const cookie = `Refresh=${token}; HttpOnly; Path=/api/auth/refresh; Secure; Max-Age=${this.configService.get(
      'NX_JWT_REFRESH_TOKEN_EXPIRATION_TIME'
    )}`;
    return {
      cookie,
      token,
    };
  }

  getCookiesForLogOut() {
    return [
      'Authentication=; HttpOnly; Path=/; Max-Age=0',
      'Refresh=; HttpOnly; Path=/api/auth/refresh; Max-Age=0',
    ];
  }
}
