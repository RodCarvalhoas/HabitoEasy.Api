import { Injectable } from "@nestjs/common";
import { HabitTypeOrmRepository } from "./habit.typeorm.repository";
import { Habit } from "../../entities/habit.entity";

@Injectable()
export class HabitRepository {
    constructor(
        private readonly habitTypeOrmRepository: HabitTypeOrmRepository
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