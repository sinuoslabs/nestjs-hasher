# Nestjs Hasher

NestJS Hasher, is a module that combines several hash libraries into one such as _bcrypt_ and _argon_.
You can use them separately, without affecting anything. This library works only with the [NestJS](https://nestjs.com/) framework.

## Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Bcrypt](#bcrypt)
  - [Argon](#argon)
  - [Available methods](#available-methods)
- [Changelog](#changelog)
- [Testing](#testing)
- [Security](#security)
- [Contributing](#contributing)
- [License](#license)

## Installation

To use the library you must execute the command below in your project.

```bash
$ npm install @sinuos/nestjs-hasher
```

## Usage

To use this library, you must declare the module in `AppModule`

### Bcrypt

This integration works with this package [Bcrypt](https://www.npmjs.com/package/bcrypt)

```typescript
import { Module } from '@nestjs/common';
import { NestjsHasherModule } from 'nestjs-hasher';

@Module({
  imports: [
    NestjsHasherModule.register({
      provider: 'bcrypt',
      round: 10,
    }),
  ],
})
export class AppModule {}
```


### Argon

This integration works with this package [Argon](https://www.npmjs.com/package/argon2)

```typescript
import { Module } from '@nestjs/common';
import { NestjsHasherModule } from 'nestjs-hasher';

@Module({
  imports: [
    NestjsHasherModule.register({
      provider: 'argon',
    }),
  ],
})
export class AppModule {}
```

### Service

```typescript
import { Injectable } from '@nestjs/common';
import { NestjsHasherService } from '@sinuos/nestjs-haasher';

@Injectable()
export class AppService {
    constructor(private readonly service: NestjsHasherService) { }
}
```

### Available methods

#### Hash

`hash(plainText)` to hash a string

### Check

`check(plainText, hashedValue)` to check if hashed value matched with your string

## Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information what has changed recently.

## Testing

```bash
$ npm run test
```

## Security

If you discover any security related issues, please email dao.houssene@gmail.com instead of using the issue tracker.

## Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md) for details.

## License

The MIT License (MIT). Please see [License File](LICENSE) for more information.