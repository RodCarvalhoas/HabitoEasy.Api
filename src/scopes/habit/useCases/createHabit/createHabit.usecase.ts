import { Injectable } from "@nestjs/common";
import { PinoLogger } from "nestjs-pino";
import BaseUseCase from "src/infra/useCase/baseUseCase";
import { CreateHabitUseCaseInput } from "./createHabit.usecase.input";
import { HabitCommandRepository } from "../../commands/repositories/habit/habit.command.repository";
import { CreateHabitValidator } from "./createHabit.usecase.validator";
import { Habit } from "../../commands/entities/habit.entity";
import DayOfWeekBuilder from "../../builders/dayOfWeek.builder";
import { AuthenticationUser } from "src/scopes/authentication/entities/authenticationUser.entity";
import { UserCreateHabitEvent } from "../../events/impl/userCreatedHabit.event";
import { CreateHabitUseCaseOutput } from "./createHabit.usecase.output";
import { EventPublisher } from "src/scopes/event/services/publisher/eventPublisher";

@Injectable()
export class CreateHabitUseCase implements BaseUseCase<CreateHabitUseCaseInput, CreateHabitUseCaseOutput>{
    constructor(
        private readonly logger: PinoLogger,
        private readonly validator: CreateHabitValidator,
        private readonly habitRepository: HabitCommandRepository,
        private readonly eventPublisher: EventPublisher,
    ){}

    async execute(input: CreateHabitUseCaseInput): Promise<CreateHabitUseCaseOutput> {
        this.logger.info(`UseCase ${CreateHabitUseCase.name} started `)

        await this.validator.validate(input);

        let habit = new Habit(input.name, input.durationInMinutes);
        habit.authenticationUser = { id: input.userId } as AuthenticationUser;
        habit.daysOfWeek = DayOfWeekBuilder.buildDaysOfWeek(input.daysOfWeek, habit);

        const result = await this.habitRepository.create(habit);

        this.eventPublisher.publish(
            new UserCreateHabitEvent(
                result.id,
                result.name,
                result.durationInMinutes,
                result.daysOfWeek.map(day => {
                    return {
                        _id: day.id,
                        habit: day.habit?.id,
                        day: day.day
                    }
                }),
                result.authenticationUser.id
            )
        )
        
        this.logger.info(`Successfully created habit for user ${input.userId}`);
        return {
            id: result.id,
            name: result.name
        };
    }
}