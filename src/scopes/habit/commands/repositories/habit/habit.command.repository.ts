import { Injectable } from "@nestjs/common";
import { HabitCommandTypeOrmRepository } from "./habit.command.typeorm.repository";
import { Habit } from "../../entities/habit.entity";

@Injectable()
export class HabitCommandRepository {
    constructor(
        private readonly habitTypeOrmRepository: HabitCommandTypeOrmRepository
    ){}

    async create(habit: Habit): Promise<Habit>{
        return await this.habitTypeOrmRepository.save(habit);
    }

    async findById(id: string): Promise<Habit>{
        return await this.habitTypeOrmRepository.findOneBy({ id });
    }

    async findAllByUserId(userId: string): Promise<Habit[]>{
        return await this.habitTypeOrmRepository.find({
            relations: {
                authenticationUser: true
            }, 
            where: {
                authenticationUser: {
                    id: userId
                }
            }
        });
    }
}