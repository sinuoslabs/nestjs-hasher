import { IHasherService } from '../interfaces';

/**
 * Argon service
 * @class ArgonService
 * @implements IHasherService
 */
export class ArgonService implements IHasherService {
  /**
   * @constructor
   * @param {string} algorithm
   */
  constructor(private readonly algorithm: string) {}

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
