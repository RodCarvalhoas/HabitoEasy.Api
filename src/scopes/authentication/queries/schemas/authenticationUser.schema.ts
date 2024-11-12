import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';

@Schema()
export class AuthenticationUserSchema {
    @Prop({ 
        type: String, 
        default: uuidv4,
    })
    _id: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    email: string;

    constructor(id: string, name: string, email: string){
        this._id = id;
        this.name = name;
        this.email = email;
    }
}

export const AuthenticationUserSchemaModel = SchemaFactory.createForClass(AuthenticationUserSchema);