import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';

@Injectable()
export class EventPublisher {
    constructor(private readonly eventBus: EventBus) {}

    publish(event: any): void {
      this.eventBus.publish(event);
    }
}
