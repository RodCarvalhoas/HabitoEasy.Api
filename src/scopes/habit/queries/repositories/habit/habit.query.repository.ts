import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { HabitSchema } from "../../schemas/habit.schema";
import { Injectable } from "@nestjs/common";

@Injectable()
export class HabitQueryRepository {
    constructor(
        @InjectModel(HabitSchema.name) 
        private habitModel: Model<HabitSchema>
    ) {}

    async create(habit: HabitSchema) {
        const createdHabit = new this.habitModel(habit);
        return createdHabit.save();
    }

    async findAllByUserId(userId: string): Promise<HabitSchema[]> {
        return await this.habitModel.find(
            {
                authenticationUser: userId,
            }
        ).exec();
    }
    
    async findById(id: string): Promise<HabitSchema> {
        return await this.habitModel.findById(id);
    }
}