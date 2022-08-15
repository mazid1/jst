import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GoogleUser, GoogleUserSchema } from './entities/google-user.entity';
import { User, UserSchema } from './entities/user.entity';
import { GoogleUserService } from './google-user.service';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: GoogleUser.name, schema: GoogleUserSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [GoogleUserService, UserService],
  exports: [GoogleUserService, UserService],
  controllers: [UserController],
})
export class UserModule {}
