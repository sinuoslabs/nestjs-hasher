import { IHasherService } from '../interfaces';
import { NestjsHasherException } from '../exceptions';
import * as bcrypt from 'bcrypt';

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
  async check(plainText: string, encryptedText: string): Promise<boolean> {
    try {
      return bcrypt.compare(plainText, encryptedText);
    } catch (e) {
      throw new NestjsHasherException(e.message);
    }
  }

  /**
   * Hash method to encrypt your text
   * @method
   * @Type [Function]
   * @param {string} plainText - The text to be encrypted
   * @return Promise<string> - Encrypted value promise
   */
  async hash(plainText: string): Promise<string> {
    try {
      return bcrypt.hash(plainText, this.bcryptRound);
    } catch (e) {
      throw new NestjsHasherException(e.message);
    }
  }
}
