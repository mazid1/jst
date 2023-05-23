import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { GoogleUser } from './entities/google-user.entity';
import { GoogleUsersService } from './google-users.service';

describe('GoogleUsersService', () => {
  let service: GoogleUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GoogleUsersService,
        { provide: getModelToken(GoogleUser.name), useValue: Model },
      ],
    }).compile();

    service = module.get<GoogleUsersService>(GoogleUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
