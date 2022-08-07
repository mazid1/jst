import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Auth, google } from 'googleapis';
import { EnvironmentVariables } from '../config/environment-variables.interface';
import { CodeDto } from './dtos/code.dto';

@Injectable()
export class AuthService {
  googleClient: Auth.OAuth2Client;

  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>
  ) {
    const clientId = this.configService.get('NX_GOOGLE_CLIENT_ID');
    const clientSecret = this.configService.get('NX_GOOGLE_CLIENT_SECRET');
    this.googleClient = new google.auth.OAuth2(
      clientId,
      clientSecret,
      'postmessage'
    );
  }

  async getGoogleToken(codeDto: CodeDto) {
    const { code } = codeDto;
    try {
      const tokenResponse = await this.googleClient.getToken(code);
      return tokenResponse;
    } catch (error) {
      console.log(error);
    }
  }
}
