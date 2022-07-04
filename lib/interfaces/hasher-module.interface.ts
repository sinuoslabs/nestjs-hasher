import { ModuleMetadata, Provider, Type } from '@nestjs/common';

/** @type HasherProviderType */
export type HasherProviderType = 'bcrypt' | 'argon';

/**
 * @interface HasherModuleOptionsFactory
 * @property createHasherOptions()
 */
export interface HasherModuleOptionsFactory {
  createHasherOptions():
    | Promise<HasherBcryptModuleOptions | HasherArgonModuleOptions>
    | HasherBcryptModuleOptions
    | HasherArgonModuleOptions;
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
  ) =>
    | Promise<HasherBcryptModuleOptions | HasherArgonModuleOptions>
    | HasherBcryptModuleOptions
    | HasherArgonModuleOptions;
  inject?: any[];
  extraProviders?: Provider[];
}

/**
 * @interface HasherBcryptModuleOptions
 * @property {HasherProviderType} provider
 * @property {number} round
 */
export interface HasherBcryptModuleOptions {
  provider: 'bcrypt';
  round: number;
}

/**
 * @interface HasherArgonModuleOptions
 * @property {HasherProviderType} provider
 * @property {number} round
 */
export interface HasherArgonModuleOptions {
  provider: 'argon';
}
