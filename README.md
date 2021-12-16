# Nestjs Hasher

NestJS Hasher, is a module that combines several hash libraries into one such as _bcrypt_ and _argon_.
You can use them separately, without affecting anything. This library works only with the [NestJS](https://nestjs.com/) framework.

## Installation

To use the library you must execute the command below in your project.

```bash
$ npm install @sinuos/nestjs-hasher
```

## Usage

To use this library, you must declare the module in `AppModule`

### Bcrypt

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
