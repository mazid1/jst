import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { ApplicationsController } from './applications.controller';
import { ApplicationsService } from './applications.service';
import { Application } from './entities/application.entity';

describe('ApplicationsController', () => {
  let controller: ApplicationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApplicationsController],
      providers: [
        ApplicationsService,
        { provide: getModelToken(Application.name), useValue: Model },
      ],
    }).compile();

    controller = module.get<ApplicationsController>(ApplicationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
