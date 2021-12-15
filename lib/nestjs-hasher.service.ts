import { Inject, Injectable } from '@nestjs/common';
import { HasherManagerService } from './managers';
import { ArgonService, BcryptService } from './providers';
import { HasherModuleOptions } from './interfaces';
import { HASHER_CONFIG } from './constants';

@Injectable()
export class NestjsHasherService extends HasherManagerService {
  /**
   * Nestjs hasher service constructor.
   * @constructor
   * @param {HasherModuleOptions} hasherOption
   */
  constructor(
    @Inject(HASHER_CONFIG) private hasherOption: HasherModuleOptions,
  ) {
    super();
  }

  /**
   * Get default provider
   * @method
   * @protected
   */
  protected getDefaultProvider(): string {
    return this.hasherOption.provider;
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
    if (!this.hasherOption.round) {
      throw new Error(`To use bcrypt salt round is required`);
    }

    return new BcryptService(Number(this.hasherOption.round));
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
