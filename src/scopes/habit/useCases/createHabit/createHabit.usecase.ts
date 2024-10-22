import { Injectable } from "@nestjs/common";
import { PinoLogger } from "nestjs-pino";
import BaseUseCase from "src/infra/useCase/baseUseCase";
import { CreateHabitUseCaseInput } from "./createHabit.usecase.input";
import { CreateHabitUseCaseOutput } from "./createHabit.usecase.output";
import { HabitRepository } from "../../repositories/habit/habit.repository";
import { CreateHabitValidator } from "./createHabit.usecase.validator";
import { Habit } from "../../entities/habit.entity";
import DayOfWeekBuilder from "../../builders/dayOfWeek.builder";
import { AuthenticationUser } from "src/scopes/authentication/entities/authenticationUser.entity";

@Injectable()
export class CreateHabitUseCase implements BaseUseCase<CreateHabitUseCaseInput, CreateHabitUseCaseOutput>{
    constructor(
        private readonly logger: PinoLogger,
        private readonly validator: CreateHabitValidator,
        private readonly habitRepository: HabitRepository
    ){}

    async execute(input: CreateHabitUseCaseInput): Promise<CreateHabitUseCaseOutput> {
        await this.validator.validate(input);

        let habit = new Habit(input.name, input.durationInMinutes);
        habit.authenticationUser = { id: input.userId } as AuthenticationUser;
        habit.daysOfWeek = DayOfWeekBuilder.buildDaysOfWeek(input.daysOfWeek, habit);

        const result = await this.habitRepository.create(habit);
        
        this.logger.info(`Successfully created habit for user ${input.userId}`);
        return {
            id: result.id,
            name: result.name
        };
    }
}