import { Module } from "@nestjs/common";
import { AuthenticationModule } from "./authentication/authentication.module";
import { HabitModule } from "./habit/habit.module";
import { EventPublisherModule } from "src/infra/events/eventPublisher.module";

@Module({
    imports: [
        AuthenticationModule,
        HabitModule,
        EventPublisherModule
    ]
})
export class ScopesModule {}