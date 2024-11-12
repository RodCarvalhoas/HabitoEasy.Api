import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { CreatedAuthenticationUserEvent } from "../Impl/createdAuthenticationUser.event";
import { PinoLogger } from "nestjs-pino";
import { CreateFailedEvent } from "src/scopes/event/services/createFailedEvent/createFailedEvent";
import { AuthenticationUserQueryRepository } from "../../queries/repositories/authentication/authenticationUser.query.repository";

@EventsHandler(CreatedAuthenticationUserEvent)
export class CreatedAuthenticationUserHandler implements IEventHandler<CreatedAuthenticationUserEvent> {
    private readonly maxRetries = 5;
    private readonly retryDelay = 10000;

    constructor(
        private readonly logger: PinoLogger,
        private readonly authenticationUserQueryRepository: AuthenticationUserQueryRepository,
        private readonly createFailedEvent: CreateFailedEvent
    ){}

    async handle(event: CreatedAuthenticationUserEvent) {
        this.logger.info(`Event Handler ${CreatedAuthenticationUserHandler.name} started`);

        let attempt = 0;

        while (attempt < this.maxRetries) {
            try {
                await this.authenticationUserQueryRepository.create({
                    _id: event.id,
                    name: event.name,
                    email: event.email,
                });

                this.logger.info(`Successfully processed event ${event.id} on attempt ${attempt + 1}`);
                break;
            } catch (error) {
                attempt++;
                this.logger.error(`Attempt ${attempt} failed for event ${event.id}`, error);

                if (attempt >= this.maxRetries) {
                    this.logger.error(`Failed to process event ${event.id} after ${this.maxRetries} attempts`);

                    await this.createFailedEvent.save(
                        CreatedAuthenticationUserEvent.name,
                        event,
                        error.message
                    );

                    throw new Error(`Exceeded max retries for event ${event.id}`);
                }

                await new Promise(resolve => setTimeout(resolve, this.retryDelay * attempt));
            }
        }
    }
}