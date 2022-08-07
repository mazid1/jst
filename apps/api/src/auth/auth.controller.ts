import { Body, Controller, Post } from '@nestjs/common';
import { CodeDto } from './dtos/code.dto';

@Controller('auth')
export class AuthController {
  @Post('google-login')
  googleLogin(@Body() codeDto: CodeDto) {
    return codeDto;
  }
}
