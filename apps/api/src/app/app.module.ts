import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApplicationsModule } from '../applications/applications.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ApplicationsModule,
    MongooseModule.forRoot(
      'mongodb://admin:pass1234@localhost:27017/jst?authMechanism=DEFAULT&authSource=admin'
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
