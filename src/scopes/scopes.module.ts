import { Module } from "@nestjs/common";
import { AuthenticationModule } from "./authentication/authentication.module";
import { HabitModule } from "./habit/habit.module";
import { EventModule } from "./event/event.module";

@Module({
    imports: [
        AuthenticationModule,
        HabitModule,
        EventModule
    ]
})
export class ScopesModule {}