import BaseUseCase from "src/infra/useCase/baseUseCase";
import { ListAllUserHabitUseCaseInput } from "./listAllUserHabit.usecase.input";
import { ListAllUserHabitUseCaseOutput, UserHabit } from "./listAllUserHabit.usecase.output";
import { PinoLogger } from "nestjs-pino";
import { ListAllUserHabitValidator } from "./listAllUserHabit.usecase.validator";
import { HabitQueryRepository } from "../../queries/repositories/habit/habit.query.repository";
import { HabitSchema } from "../../queries/schemas/habit.schema";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ListAllUserHabitUseCase implements BaseUseCase<ListAllUserHabitUseCaseInput, ListAllUserHabitUseCaseOutput> {
    constructor(
        private readonly logger: PinoLogger,
        private readonly validator: ListAllUserHabitValidator,
        private readonly habitQueryRepository: HabitQueryRepository
    ){}

    async execute(input: ListAllUserHabitUseCaseInput): Promise<ListAllUserHabitUseCaseOutput> {
        await this.validator.validate(input);

        const habits: HabitSchema[] = await this.habitQueryRepository.findAllByUserId(input.userId);

        this.logger.info(`Successfully fetched habits for user ${input.userId}`);
        return {
            userHabit: habits.map((habit): UserHabit => {
                return {
                    id: habit._id,
                    name: habit.name,
                    durationInMinutes: habit.durationInMinutes,
                    daysOfWeek: habit.daysOfWeek.map(d => d.day)
                }
            })
        }
    }
}