import { Global, Module } from "@nestjs/common";
import { FailedEventRepositoryModule } from "../../repositories/failedEvent.repository.module";
import { CreateFailedEvent } from "./createFailedEvent";

@Global()
@Module({
    imports: [FailedEventRepositoryModule],
    providers: [CreateFailedEvent],
    exports: [CreateFailedEvent]
})
export class CreateFailedEventModule {}