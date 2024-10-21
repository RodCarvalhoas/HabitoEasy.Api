import { Injectable } from "@nestjs/common";
import { DayOfWeekTypeOrmRepository } from "./dayOfWeek.typeorm.repository";
import { DayOfWeek } from "../../entities/dayOfWeek";

@Injectable()
export class DayOfWeekRepository {
    constructor(
        private readonly dayOfWeekTypeOrmRepository: DayOfWeekTypeOrmRepository
    ){}
    
    async create(dayOfWeek: DayOfWeek): Promise<DayOfWeek>{
        return await this.dayOfWeekTypeOrmRepository.save(dayOfWeek);
    }

    async findById(id: string): Promise<DayOfWeek>{
        return await this.dayOfWeekTypeOrmRepository.findOneBy({id});
    }

    async findAllByHabitId(habitId: string): Promise<DayOfWeek[]>{
        return await this.dayOfWeekTypeOrmRepository.find({
            relations: {
                habit: true
            }, 
            where: {
                habit: {
                    id: habitId
                }
            }
        });
    }
}