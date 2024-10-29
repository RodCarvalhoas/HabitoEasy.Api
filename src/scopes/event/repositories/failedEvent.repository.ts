import { Model } from 'mongoose';
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FailedEventSchema } from '../schemas/failedEvent.schema';

@Injectable()
export class FailedEventRepository {
    constructor(
        @InjectModel(FailedEventSchema.name) 
        private failedEventModel: Model<FailedEventSchema>
    ) {}

    async create(failedEvent: FailedEventSchema) {
        const createdFailedEvent = new this.failedEventModel(failedEvent);
        return createdFailedEvent.save();
    }
}