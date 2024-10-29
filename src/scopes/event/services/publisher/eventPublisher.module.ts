import { Module, Global } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventPublisher } from './eventPublisher';

@Global()
@Module({
  imports: [CqrsModule],
  providers: [EventPublisher],
  exports: [EventPublisher],
})
export class EventPublisherModule {}
