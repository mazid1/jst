import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { MongooseModule } from '@nestjs/mongoose';
import * as Joi from 'joi';
import { Connection } from 'mongoose';
import { ApplicationsModule } from './modules/applications/applications.module';
import { AuthModule } from './modules/auth/auth.module';
import { InterviewsModule } from './modules/interviews/interviews.module';
import { OrganizationsModule } from './modules/organizations/organizations.module';

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
        NX_MONGO_CONNECTION_STRING: Joi.string().required(),
      }),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get('NX_MONGO_CONNECTION_STRING'),
        connectionFactory: (connection: Connection) => {
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          connection.plugin(require('mongoose-autopopulate'));
          return connection;
        },
      }),
    }),
    ApplicationsModule,
    AuthModule,
    OrganizationsModule,
    InterviewsModule,
  ],
})
export class AppModule {}
