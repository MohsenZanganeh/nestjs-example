import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import * as path from 'path';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import * as winston from 'winston';

import { I18nModule, I18nJsonParser } from 'nestjs-i18n';
console.log('-__sdirname:', path.join('src/', '/i18n/'));

@Module({
  imports: [
    UserModule,
    ProductModule,
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      fallbacks: {
        en: 'en',
        fa: 'fa',
      },
      parser: I18nJsonParser,
      parserOptions: {
        path: path.join('src', 'i18n'),
        watch: true,
      },
    }),
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            nestWinstonModuleUtilities.format.nestLike(),
          ),
        }),
      ],
    }),
  ],
})
export class AppModule {}
