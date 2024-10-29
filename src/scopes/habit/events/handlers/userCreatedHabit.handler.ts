import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { UserCreateHabitEvent } from "../impl/userCreatedHabit.event";
import { HabitQueryRepository } from "../../queries/repositories/habit/habit.query.repository";
import { PinoLogger } from "nestjs-pino";

@EventsHandler(UserCreateHabitEvent)
export class UserCreatedHabitHandler implements IEventHandler<UserCreateHabitEvent> {
    private readonly maxRetries = 5;
    private readonly retryDelay = 10000;

    constructor(
        private readonly logger: PinoLogger,
        private readonly habitQueryRepository: HabitQueryRepository
    ){}

    async handle(event: UserCreateHabitEvent) {
        this.logger.info(`Event Handler ${UserCreatedHabitHandler.name} started`);

        let attempt = 0;

        while (attempt < this.maxRetries) {
            try {
                await this.habitQueryRepository.create({
                    _id: event.id,
                    name: event.name,
                    daysOfWeek: event.daysOfWeek,
                    durationInMinutes: event.durationInMinutes,
                    authenticationUser: event.userId
                });

                this.logger.info(`Successfully processed event ${event.id} on attempt ${attempt + 1}`);
                break;
            } catch (error) {
                attempt++;
                this.logger.error(`Attempt ${attempt} failed for event ${event.id}`, error);

                if (attempt >= this.maxRetries) {
                    this.logger.error(`Failed to process event ${event.id} after ${this.maxRetries} attempts`);
                    throw new Error(`Exceeded max retries for event ${event.id}`);
                }

                await new Promise(resolve => setTimeout(resolve, this.retryDelay * attempt));
            }
        }
    }
}