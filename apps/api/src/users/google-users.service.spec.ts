import { Test, TestingModule } from '@nestjs/testing';
import { GoogleUsersService } from './google-users.service';

describe('GoogleUsersService', () => {
  let service: GoogleUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GoogleUsersService],
    }).compile();

    service = module.get<GoogleUsersService>(GoogleUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
