import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Auth, google } from 'googleapis';
import { EnvironmentVariables } from '../config/environment-variables.interface';
import { CodeDto } from './dtos/code.dto';

@Injectable()
export class AuthService {
  oauth2Client: Auth.OAuth2Client;

  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>
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

      return userInfoResponse.data;
    } catch (error) {
      console.log(error);
    }
  }
}
