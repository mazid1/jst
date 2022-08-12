import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GoogleUser, GoogleUserSchema } from './entities/google-user.entity';
import { GoogleUserService } from './google-user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: GoogleUser.name, schema: GoogleUserSchema },
    ]),
  ],
  providers: [GoogleUserService],
  exports: [GoogleUserService],
})
export class UserModule {}
