import { Test, TestingModule } from '@nestjs/testing';
import { NestjsHasherService } from './nestjs-hasher.service';
import { HASHER_CONFIG } from './constants';
import { NestjsHasherModule } from './nestjs-hasher.module';
import { BcryptService } from './providers';

describe('NestjsHasherService', () => {
  let service: NestjsHasherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        NestjsHasherModule.register({
          provider: 'bcrypt',
          round: 10,
        }),
      ],
    }).compile();

    service = module.get<NestjsHasherService>(NestjsHasherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be instance of NestjsHasherService', () => {
    expect(service).toBeInstanceOf(NestjsHasherService);
  });

  it('should have method hash', () => {
    expect(service).toHaveProperty('hash');
  });

  it('should have method check', () => {
    expect(service).toHaveProperty('check');
  });

  it('should be hash string', () => {
    service.hash = jest
      .fn()
      .mockResolvedValue('avDhjZvHEiH4dJdfzkMpYj06tsXdx5tL');
    expect(service.hash('hello')).toEqual(
      Promise.resolve('avDhjZvHEiH4dJdfzkMpYj06tsXdx5tL'),
    );
  });
});
