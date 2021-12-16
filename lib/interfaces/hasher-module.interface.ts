import { ModuleMetadata, Provider, Type } from '@nestjs/common';

/** @type HasherProviderType */
export type HasherProviderType = 'bcrypt' | 'argon';

/**
 * @interface HasherModuleOptionsFactory
 * @property createHasherOptions()
 */
export interface HasherModuleOptionsFactory {
  createHasherOptions(): Promise<HasherModuleOptions> | HasherModuleOptions;
}

/**
 * @interface HasherModuleAsyncOptions
 * @extends {Pick<ModuleMetadata, 'imports'>}
 * @property useExisting
 * @property useClass
 * @property useFactory
 * @property inject
 * @property extraProviders
 */
export interface HasherModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<HasherModuleOptionsFactory>;
  useClass?: Type<HasherModuleOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<HasherModuleOptions> | HasherModuleOptions;
  inject?: any[];
  extraProviders?: Provider[];
}

/**
 * @interface HasherModuleOptions
 * @property {HasherProviderType} provider
 * @property {number} round
 */
export interface HasherModuleOptions {
  provider: HasherProviderType;
  round?: number;
}
