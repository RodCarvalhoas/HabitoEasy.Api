import { Repository } from "typeorm";
import { DayOfWeek } from "../../entities/dayOfWeek";
import { InjectRepository } from "@nestjs/typeorm";

export class DayOfWeekTypeOrmRepository extends Repository<DayOfWeek> {
    constructor(
        @InjectRepository(DayOfWeek)
        private readonly dayOfWeekRepository: Repository<DayOfWeek>
    ){
        super(dayOfWeekRepository.target, dayOfWeekRepository.manager, dayOfWeekRepository.queryRunner);
    }
}