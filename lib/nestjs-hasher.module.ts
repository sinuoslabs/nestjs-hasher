import { Module } from '@nestjs/common';
import { NestjsHasherService } from './nestjs-hasher.service';

@Module({
  providers: [NestjsHasherService],
  exports: [NestjsHasherService],
})
export class NestjsHasherModule {}
