import {
  Controller,
  Get,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import MongooseClassSerializerInterceptor from '../interceptors/mongoose-class-serializer.interceptor';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(MongooseClassSerializerInterceptor(User))
  @UseGuards(JwtAuthGuard)
  @Get('/me')
  whoAmI(@Req() request) {
    return request.user;
  }
}
