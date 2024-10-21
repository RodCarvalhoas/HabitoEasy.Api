import { Module } from "@nestjs/common";
import { AuthenticationModule } from "./authentication/authentication.module";
import { HabitModule } from "./habit/habit.module";

@Module({
    imports: [
        AuthenticationModule,
        HabitModule,
    ]
})
export class ScopesModule {}