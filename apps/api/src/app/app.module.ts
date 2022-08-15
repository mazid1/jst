import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { MongooseModule } from '@nestjs/mongoose';
import * as Joi from 'joi';
import { ApplicationsModule } from '../applications/applications.module';
import { AuthModule } from '../auth/auth.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NX_GOOGLE_CLIENT_ID: Joi.string().required(),
        NX_GOOGLE_CLIENT_SECRET: Joi.string().required(),
        NX_JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
        NX_JWT_ACCESS_TOKEN_EXPIRATION_TIME: Joi.number().required(),
        NX_JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
        NX_JWT_REFRESH_TOKEN_EXPIRATION_TIME: Joi.number().required(),
      }),
    }),
    MongooseModule.forRoot(
      'mongodb://admin:pass1234@localhost:27017/jst?authMechanism=DEFAULT&authSource=admin'
    ),
    ApplicationsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
