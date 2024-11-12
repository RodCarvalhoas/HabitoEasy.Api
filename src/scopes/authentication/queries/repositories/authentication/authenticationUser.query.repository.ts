import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AuthenticationUserSchema } from "../../schemas/authenticationUser.schema";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthenticationUserQueryRepository {
    constructor(
        @InjectModel(AuthenticationUserSchema.name) 
        private authenticationUserModel: Model<AuthenticationUserSchema>
    ) {}

    async create(habit: AuthenticationUserSchema) {
        const createdHabit = new this.authenticationUserModel(habit);
        return createdHabit.save();
    }

    async findById(id: string): Promise<AuthenticationUserSchema> {
        return await this.authenticationUserModel.findById(id);
    }
}