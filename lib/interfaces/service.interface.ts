/**
 * @interface IHasherService
 * @property getDefaultProvider
 * @property hash
 * @property compare
 */
export interface IHasherService {
  hash(plainText: string): Promise<string>;
  check(plainText: string, encryptedText: string): Promise<boolean>;
}
