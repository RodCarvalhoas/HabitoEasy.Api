import { FailedEventRepository } from "../../repositories/failedEvent.repository";
import { Injectable } from "@nestjs/common";
import { FailedEventSchema } from "../../schemas/failedEvent.schema";

@Injectable()
export class CreateFailedEvent {
    constructor(
        private readonly failedEventRepository: FailedEventRepository
    ){}

    async save(eventName: string, eventData: any, errorMessage: string) {
        const eventDataStr = JSON.stringify(eventData);
        const failedSchema = new FailedEventSchema(eventName, eventDataStr, errorMessage);

        return this.failedEventRepository.create(failedSchema);
    }
}