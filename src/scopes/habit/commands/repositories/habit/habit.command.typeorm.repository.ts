import { Repository } from "typeorm";
import { Habit } from "../../entities/habit.entity";
import { InjectRepository } from "@nestjs/typeorm";

export class HabitCommandTypeOrmRepository extends Repository<Habit> {
    constructor(
        @InjectRepository(Habit)
        private readonly habitRepository: Repository<Habit>
    ){
        super(habitRepository.target, habitRepository.manager, habitRepository.queryRunner);
    }
}