import { Module } from "@nestjs/common";
import { HabitCommandRepositoryModule } from "./commands/repositories/habit/habit.command.repository.module";
import { DayOfWeekRepositoryModule } from "./commands/repositories/dayOfWeek/dayOfWeek.repository.module";
import { CreateHabitUseCaseModule } from "./useCases/createHabit/createHabit.usecase.module";
import { HabitQueryRepositoryModule } from "./queries/repositories/habit/habit.query.repository.module";
import { ListAllUserHabitUseCaseModule } from "./useCases/listAllUserHabit/listAllUserHabit.usecase.module";
import { CqrsModule } from "@nestjs/cqrs";
import { UserCreatedHabitHandler } from "./events/handlers/userCreatedHabit.handler";
import { HabitController } from "./controller/habit.controller";

const EventHandlers = [UserCreatedHabitHandler];

@Module({
    imports: [
        HabitCommandRepositoryModule,
        DayOfWeekRepositoryModule,
        CreateHabitUseCaseModule,
        HabitQueryRepositoryModule,
        ListAllUserHabitUseCaseModule,
        CqrsModule
    ],
    controllers: [HabitController],
    providers: [...EventHandlers]
})
export class HabitModule {} 