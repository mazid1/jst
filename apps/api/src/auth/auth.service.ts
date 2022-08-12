import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Auth, google } from 'googleapis';
import { EnvironmentVariables } from '../config/environment-variables.interface';
import { GoogleUserDto } from '../user/dtos/google-user.dto';
import { GoogleUserService } from '../user/google-user.service';
import { CodeDto } from './dtos/code.dto';

@Injectable()
export class AuthService {
  oauth2Client: Auth.OAuth2Client;

  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
    private readonly googleUserService: GoogleUserService
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
      console.log(tokenResponse.tokens);

      const userInfoResponse = await google
        .oauth2('v2')
        .userinfo.get({ auth: this.oauth2Client });

      const googleUserDto = userInfoResponse.data;

      let googleUserFromDB;
      try {
        googleUserFromDB = await this.googleUserService.findOne(
          googleUserDto.id
        );
      } catch (notFoundException) {
        console.log(notFoundException);
      }

      if (!googleUserFromDB) {
        console.log(
          `GoogleUser #${googleUserDto.id} not found, creating new one.`
        );
        const newGoogleUser = await this.googleUserService.create({
          ...(googleUserDto as GoogleUserDto),
          externalId: googleUserDto.id,
          tokens: {
            access_token: tokenResponse.tokens.access_token || '',
            refresh_token: tokenResponse.tokens.refresh_token || '',
          },
        });
        return newGoogleUser;
      }

      return googleUserFromDB;
    } catch (error) {
      console.log(error);
    }
  }
}
