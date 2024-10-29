import { Module } from "@nestjs/common";
import { HabitQueryRepositoryModule } from "../../queries/repositories/habit/habit.query.repository.module";
import { ListAllUserHabitUseCase } from "./listAllUserHabit.usecase";
import { ListAllUserHabitValidator } from "./listAllUserHabit.usecase.validator";

@Module({
    imports: [HabitQueryRepositoryModule],
    providers: [ListAllUserHabitUseCase, ListAllUserHabitValidator],
    exports: [ListAllUserHabitUseCase]
})
export class ListAllUserHabitUseCaseModule{}