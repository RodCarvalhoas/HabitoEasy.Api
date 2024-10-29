import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';

@Schema()
export class DayOfWeekSchema {
    @Prop({ 
        type: String, 
        default: uuidv4,
    })
    _id: string;

    @Prop({ required: true })
    day: number;

    @Prop({ required: true })
    habit: string;

    constructor(day: number, habit: string){
        this.day = day;
        this.habit = habit;
    }
}

export const DayOfWeekSchemaModel = SchemaFactory.createForClass(DayOfWeekSchema);