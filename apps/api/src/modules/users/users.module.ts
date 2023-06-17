import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GoogleUser, GoogleUserSchema } from './entities/google-user.entity';
import { User, UserSchema } from './entities/user.entity';
import { GoogleUsersService } from './google-users.service';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: GoogleUser.name, schema: GoogleUserSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [GoogleUsersService, UsersService],
  exports: [GoogleUsersService, UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
