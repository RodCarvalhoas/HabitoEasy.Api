import { Module } from '@nestjs/common';
import { ScopesModule } from './scopes/scopes.module';

@Module({
  imports: [
    ScopesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
