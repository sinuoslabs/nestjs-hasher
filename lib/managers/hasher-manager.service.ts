import { IHasherService } from '../interfaces';

/**
 * Hasher manager
 * @abstract
 * @class HasherManagerService
 * @implements IHasherService
 */
export abstract class HasherManagerService implements IHasherService {
  /**
   * The array of created "providers".
   * @property {array} providers
   */
  protected providers: Array<string> = [];

  /**
   * The registered custom driver creators.
   * @property {array} customCreators
   * @var array
   */
  protected customCreator = [];

  /**
   * Get the default provider name.
   * @method
   * @Type [Function]
   * @return string
   */
  protected abstract getDefaultProvider(): string;

  /**
   * Hash method to encrypt your text
   * @method
   * @Type [Function]
   * @param {string} plainText - The text to be encrypted
   * @return Promise<string> - Encrypted value promise
   */
  abstract hash(plainText: string): Promise<string>;

  /**
   * Compare method to compare encrypted text and simple text
   * @method
   * @Type [Function}
   * @param {string} plainText
   * @param {string} encryptedText
   * @return Promise<boolean>
   */
  abstract check(plainText: string, encryptedText: string): Promise<boolean>;

  /**
   * Get a provider instance.
   * @private
   * @param {string} provider
   * @return function
   */
  protected provider(provider?: string): any {
    const defaultProvider = provider ?? this.getDefaultProvider();

    if (!defaultProvider) {
      throw new Error(`Unable to resolve NULL provider for ${provider}.`);
    }

    if (!this.providers[defaultProvider]) {
      this.providers[defaultProvider] = this.createProvider(defaultProvider);
    }

    return this.providers[defaultProvider];
  }

  /**
   * Create a new provider instance.
   * @private
   * @param {string} provider
   * @return function
   * @throws Error
   */
  private createProvider(provider: string) {
    if (this.customCreator[provider]) {
      return this.callCustomCreator(provider);
    } else {
      const providerName = `${provider
        .charAt(0)
        .toUpperCase()}${provider.substring(1)}`;
      const method = `create${providerName}Provider`;

      if (typeof this[method] === 'function') {
        return this[method]();
      }
    }

    throw new Error(`Driver [${provider}] not supported.`);
  }

  /**
   * Call a custom provider creator.
   * @private
   * @param {string} provider
   * @return function
   */
  private callCustomCreator(provider: string) {
    return this.customCreator[provider]();
  }
}
