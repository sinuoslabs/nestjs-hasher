import { DynamicModule, Module, ValueProvider } from '@nestjs/common';
import { NestjsHasherService } from './nestjs-hasher.service';
import { HASHER_CONFIG } from './constants';
import { HasherModuleOptions } from './interfaces';

@Module({
  providers: [NestjsHasherService],
  exports: [NestjsHasherService],
})
export class NestjsHasherModule {
  //
}
