import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CodeDto } from './dtos/code.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('google-login')
  googleLogin(@Body() codeDto: CodeDto) {
    return this.authService.getGoogleToken(codeDto);
  }
}
