import { Module } from '@nestjs/common';
import { ApplicationsModule } from '../applications/applications.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ApplicationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
