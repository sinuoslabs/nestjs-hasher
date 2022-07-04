import { Inject, Injectable } from '@nestjs/common';
import { HasherManagerService } from './managers';
import { ArgonService, BcryptService } from './providers';
import {
  HasherArgonModuleOptions,
  HasherBcryptModuleOptions,
  HasherProviderType,
} from './interfaces';
import { HASHER_CONFIG } from './constants';

@Injectable()
export class NestjsHasherService extends HasherManagerService {
  /**
   * Nestjs hasher service constructor.
   * @constructor
   * @param {HasherBcryptModuleOptions} options
   */
  constructor(
    @Inject(HASHER_CONFIG)
    private options: HasherBcryptModuleOptions | HasherArgonModuleOptions,
  ) {
    super();

    if (
      this.options.provider !== 'argon' &&
      this.options.provider !== 'bcrypt'
    ) {
      throw new Error(`Config error your provider not exist`);
    }
  }

  /**
   * Get default provider
   * @method
   * @protected
   */
  protected getDefaultProvider(): HasherProviderType {
    return this.options.provider;
  }

  /**
   * Create argon provider.
   * @type [Function]
   * @protected
   */
  protected createArgonProvider() {
    return new ArgonService();
  }

  /**
   * Create bcrypt provider.
   * @type [Function]
   * @protected
   */
  protected createBcryptProvider() {
    if (this.options.provider === 'bcrypt') {
      // defined option type
      this.options = this.options as HasherBcryptModuleOptions;

      if (!this.options.round) {
        throw new Error(`To use bcrypt salt round is required`);
      }

      return new BcryptService(Number(this.options?.round));
    }
  }

  /**
   * Compare method to compare encrypted text and simple text
   * @method
   * @Type [Function}
   * @param {string} plainText
   * @param {string} encryptedText
   * @return Promise<boolean>
   */
  async check(plainText: string, encryptedText: string): Promise<boolean> {
    return this.provider().check(plainText, encryptedText);
  }

  /**
   * Hash method to encrypt your text
   * @method
   * @Type [Function]
   * @param {string} plainText - The text to be encrypted
   * @return Promise<string> - Encrypted value promise
   */
  async hash(plainText: string): Promise<string> {
    return this.provider().hash(plainText);
  }
}
