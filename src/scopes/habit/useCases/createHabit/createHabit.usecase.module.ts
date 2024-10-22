import { Module } from "@nestjs/common";
import { HabitRepositoryModule } from "../../repositories/habit/habit.repository.module";
import { CreateHabitUseCase } from "./createHabit.usecase";
import { CreateHabitValidator } from "./createHabit.usecase.validator";

@Module({
    imports: [HabitRepositoryModule],
    providers: [CreateHabitUseCase, CreateHabitValidator],
    exports: [CreateHabitUseCase]
})
export class CreateHabitUseCaseModule{}