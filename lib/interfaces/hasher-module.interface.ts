import { ModuleMetadata, Provider, Type } from '@nestjs/common';

export type HasherProviderType = 'bcrypt' | 'argon';

export interface IHasherBcrypt {
  provider: 'bcrypt' | HasherProviderType;
  round: number;
}

export interface IHasherArgon {
  provider: 'argon' | HasherProviderType;
  algo: string;
}

export interface HasherModuleOptionsFactory {
  createHasherOptions(): Promise<HasherModuleOptions> | HasherModuleOptions;
}

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

export interface HasherModuleOptions extends IHasherBcrypt, IHasherArgon {}
