import { Test, TestingModule } from '@nestjs/testing';
import { NestjsHasherService } from './nestjs-hasher.service';

describe('NestjsHasherService', () => {
  let service: NestjsHasherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NestjsHasherService],
    }).compile();

    service = module.get<NestjsHasherService>(NestjsHasherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
