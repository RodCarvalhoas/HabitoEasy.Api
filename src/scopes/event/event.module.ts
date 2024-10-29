import { Module } from "@nestjs/common";
import { FailedEventRepositoryModule } from "./repositories/failedEvent.repository.module";
import { EventPublisherModule } from "./services/publisher/eventPublisher.module";
import { CreateFailedEventModule } from "./services/createFailedEvent/createFailedEvent.module";

@Module({
    imports: [EventPublisherModule, FailedEventRepositoryModule, CreateFailedEventModule]
})
export class EventModule {}