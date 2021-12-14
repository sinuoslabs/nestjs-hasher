import { IHasherService } from '../interfaces';

/**
 * Bcrypt service.
 * @class BcryptService
 * @implements IHasherService
 */
export class BcryptService implements IHasherService {
  /**
   * @constructor
   * @param {number} bcryptRound
   */
  constructor(private readonly bcryptRound: number) {}

  /**
   * Compare method to compare encrypted text and simple text
   * @method
   * @Type [Function}
   * @param {string} plainText
   * @param {string} encryptedText
   * @return Promise<boolean>
   */
  async compare(plainText: string, encryptedText: string): Promise<boolean> {
    return Promise.resolve(false);
  }

  /**
   * Hash method to encrypt your text
   * @method
   * @Type [Function]
   * @param {string} plainText - The text to be encrypted
   * @return Promise<string> - Encrypted value promise
   */
  async hash(plainText: string): Promise<string> {
    return Promise.resolve('');
  }
}
