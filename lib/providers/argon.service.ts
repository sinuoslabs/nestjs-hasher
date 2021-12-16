import { IHasherService } from '../interfaces';
import { NestjsHasherException } from '../exceptions';
import * as argon2 from 'argon2';

/**
 * Argon service
 * @class ArgonService
 * @implements IHasherService
 */
export class ArgonService implements IHasherService {
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
      return argon2.verify(encryptedText, plainText);
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
      return argon2.hash(plainText);
    } catch (e) {
      throw new NestjsHasherException(e.message);
    }
  }
}
