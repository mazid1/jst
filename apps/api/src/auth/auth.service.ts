import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Auth, google } from 'googleapis';
import { EnvironmentVariables } from '../config/environment-variables.interface';
import { CreateGoogleUserDto } from '../user/dtos/create-google-user.dto';
import { GoogleUserService } from '../user/google-user.service';
import { UserService } from '../user/user.service';
import { CodeDto } from './dtos/code.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  oauth2Client: Auth.OAuth2Client;

  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
    private readonly googleUserService: GoogleUserService,
    private readonly userService: UserService
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

      const googleUserFromDB = await this.googleUserService.findOneOrCreate({
        ...(googleUserData as CreateGoogleUserDto),
        externalId: googleUserData.id,
        tokens: { ...tokenResponse.tokens },
      });

      const userFromDB = await this.userService.findOneOrCreate({
        name: googleUserFromDB.name,
        email: googleUserFromDB.email,
        googleUser: googleUserFromDB.id,
      });

      return userFromDB;
    } catch (error) {
      this.logger.log(error);
    }
  }
}
