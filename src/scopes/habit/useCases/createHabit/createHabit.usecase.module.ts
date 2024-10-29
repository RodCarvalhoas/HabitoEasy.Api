import { Module } from "@nestjs/common";
import { HabitCommandRepositoryModule } from "../../commands/repositories/habit/habit.command.repository.module";
import { CreateHabitUseCase } from "./createHabit.usecase";
import { CreateHabitValidator } from "./createHabit.usecase.validator";

@Module({
    imports: [HabitCommandRepositoryModule],
    providers: [CreateHabitUseCase, CreateHabitValidator],
    exports: [CreateHabitUseCase]
})
export class CreateHabitUseCaseModule{}