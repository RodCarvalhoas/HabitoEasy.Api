import { Module } from '@nestjs/common';
import { ScopesModule } from './scopes/scopes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './infra/db/data-source';

@Module({
  imports: [
    ScopesModule,
    TypeOrmModule.forRoot(dataSourceOptions),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
