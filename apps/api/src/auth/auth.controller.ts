import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import MongooseClassSerializerInterceptor from '../interceptors/mongoose-class-serializer.interceptor';
import { User } from '../user/entities/user.entity';
import { AuthService } from './auth.service';
import { CodeDto } from './dtos/code.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseInterceptors(MongooseClassSerializerInterceptor(User))
  @Post('google-login')
  async googleLogin(@Body() codeDto: CodeDto) {
    return this.authService.loginWithGoogle(codeDto);
  }
}
