import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';
import { DayOfWeekSchema } from './dayOfWeek.schema';

@Schema()
export class HabitSchema {
    @Prop({ 
        type: String, 
        default: uuidv4,
    })
    _id: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    durationInMinutes: number;

    @Prop({ type: [DayOfWeekSchema], default: [] })
    daysOfWeek: DayOfWeekSchema[];

    @Prop({ required: true })
    authenticationUser: string;

    constructor(name: string, durationInMinutes: number, authenticationUser: string){
        this.name = name;
        this.durationInMinutes = durationInMinutes;
        this.authenticationUser = authenticationUser;
    }
}

export const HabitSchemaModel = SchemaFactory.createForClass(HabitSchema);