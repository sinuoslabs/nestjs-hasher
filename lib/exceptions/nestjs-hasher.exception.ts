/**
 * @class NestjsHasherException
 * @extends Error
 */
export class NestjsHasherException extends Error {
  /**
   * @constructor
   * @param message
   */
  constructor(message: string) {
    super(message);
  }
}
