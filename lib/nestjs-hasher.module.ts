import { DynamicModule, Module, Provider, ValueProvider } from '@nestjs/common';
import { NestjsHasherService } from './nestjs-hasher.service';
import { HASHER_CONFIG } from './constants';
import {
  HasherModuleAsyncOptions,
  HasherModuleOptions,
  HasherModuleOptionsFactory,
} from './interfaces';

@Module({})
export class NestjsHasherModule {
  /**
   * Register module
   * @static
   * @param {HasherModuleOptions} options
   * @return DynamicModule
   */
  static register(options: HasherModuleOptions): DynamicModule {
    const hasherProvider: ValueProvider = {
      provide: HASHER_CONFIG,
      useValue: options,
    };

    return {
      module: NestjsHasherModule,
      providers: [NestjsHasherService, hasherProvider],
      exports: [NestjsHasherService, hasherProvider],
    };
  }

  /**
   * Register async
   * @static
   * @param {HasherModuleAsyncOptions} options
   * @return DynamicModule
   */
  static registerAsync(options: HasherModuleAsyncOptions): DynamicModule {
    const hasherProvider: ValueProvider = {
      provide: HASHER_CONFIG,
      useValue: options,
    };

    return {
      module: NestjsHasherModule,
      imports: options.imports || [],
      providers: [NestjsHasherService, ...this.createAsyncProviders(options)],
      exports: [NestjsHasherService, hasherProvider],
    };
  }

  /**
   * Create async providers
   * @private
   * @param {HasherModuleAsyncOptions} options
   * @return Provider[]
   */
  private static createAsyncProviders(
    options: HasherModuleAsyncOptions,
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncConfigProvider(options)];
    } else if (!options.useClass) {
      return [
        {
          provide: HASHER_CONFIG,
          useValue: {},
          inject: options.inject || [],
        },
      ];
    }

    return [
      this.createAsyncConfigProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
  }

  /**
   * Create async config provider
   * @private
   * @param {HasherModuleAsyncOptions} options
   * @return Provider<any>
   */
  private static createAsyncConfigProvider(
    options: HasherModuleAsyncOptions,
  ): Provider<any> {
    if (options.useFactory) {
      return {
        provide: HASHER_CONFIG,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    const inject = options.useClass || options.useExisting;

    if (!inject) {
      throw new Error(
        'Invalid configuration. Must provide useFactory, useClass or useExisting',
      );
    }

    return {
      provide: HASHER_CONFIG,
      async useFactory(
        optionsFactory: HasherModuleOptionsFactory,
      ): Promise<HasherModuleOptions> {
        return optionsFactory.createHasherOptions();
      },
      inject: [inject],
    };
  }
}
