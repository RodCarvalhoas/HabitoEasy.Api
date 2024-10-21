import { Module } from "@nestjs/common";
import { HabitRepositoryModule } from "./repositories/habit/habit.repository.module";
import { DayOfWeekRepositoryModule } from "./repositories/dayOfWeek/dayOfWeek.repository.module";

@Module({
    imports: [
        HabitRepositoryModule,
        DayOfWeekRepositoryModule
    ]
})
export class HabitModule {} 