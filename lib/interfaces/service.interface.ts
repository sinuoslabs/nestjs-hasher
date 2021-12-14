/**
 * @interface IHasherService
 * @property getDefaultProvider
 * @property hash
 * @property compare
 */
export interface IHasherService {
  hash(plainText: string): Promise<string>;
  compare(plainText: string, encryptedText: string): Promise<boolean>;
}
