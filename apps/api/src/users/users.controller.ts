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
import { UsersService } from './users.service';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseInterceptors(MongooseClassSerializerInterceptor(User))
  @Get('/me')
  whoAmI(@Req() request) {
    return request.user;
  }
}
