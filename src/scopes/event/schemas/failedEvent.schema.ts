import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { v4 as uuidv4 } from 'uuid';

@Schema()
export class FailedEventSchema {

    @Prop({
        type: String, 
        default: uuidv4
    })
    _id: string;

    @Prop({
        required: true
    })
    eventName: string;

    @Prop({
        required: true
    })
    eventData: string;

    @Prop({
        required: true,
        default: false
    })
    processed: boolean;

    @Prop({
        required: true
    })
    errorMessage: string;

    @Prop({
        required: true,
        default: () => new Date()
    })
    timestamp: Date;

    constructor(eventName: string, eventData: string, errorMessage: string) {
        this.eventName = eventName;
        this.eventData = eventData;
        this.errorMessage = errorMessage;
        this.processed = false;
        this.timestamp = new Date();
    }
}

export const FailedEventSchemaModel = SchemaFactory.createForClass(FailedEventSchema);