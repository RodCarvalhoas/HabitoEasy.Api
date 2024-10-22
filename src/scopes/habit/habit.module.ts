import { Module } from "@nestjs/common";
import { HabitRepositoryModule } from "./repositories/habit/habit.repository.module";
import { DayOfWeekRepositoryModule } from "./repositories/dayOfWeek/dayOfWeek.repository.module";
import { CreateHabitUseCaseModule } from "./useCases/createHabit/createHabit.usecase.module";
import { HabitController } from "./controller/habit.controller";

@Module({
    imports: [
        HabitRepositoryModule,
        DayOfWeekRepositoryModule,
        CreateHabitUseCaseModule
    ],
    controllers: [HabitController]
})
export class HabitModule {} 