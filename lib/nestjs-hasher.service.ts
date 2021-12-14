import { Inject, Injectable } from '@nestjs/common';
import { HasherManagerService } from './hasher-manager.service';
import { ArgonService, BcryptService } from './providers';
import { HasherModuleOptions } from './interfaces';

@Injectable()
export class NestjsHasherService extends HasherManagerService {
  /**
   * Nestjs hasher service constructor.
   * @constructor
   * @param {HasherModuleOptions} hasherOption
   */
  constructor(@Inject() private hasherOption: HasherModuleOptions) {
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
    return new ArgonService(this.hasherOption.algo);
  }

  /**
   * Create bcrypt provider.
   * @type [Function]
   * @protected
   */
  protected createBcryptProvider() {
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
  async compare(plainText: string, encryptedText: string): Promise<boolean> {
    return this.provider().compare(plainText, encryptedText);
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
