import { Module } from '@nestjs/common';
import { ScopesModule } from './scopes/scopes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './infra/db/data-source';
import { LoggerModule } from 'nestjs-pino';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ScopesModule,
    TypeOrmModule.forRoot(dataSourceOptions),
    MongooseModule.forRoot(process.env.MONGO_CONNECTION_STRING),
    LoggerModule.forRoot({
      pinoHttp: {
        quietReqLogger: true,
        mixin: () => ({ env: process.env.NODE_ENV ?? 'UNKNOWN' }),
        formatters: {
          level(label, _number) {
            return { level: label };
          }
        }
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}