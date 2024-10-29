import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DayOfWeek } from "../../entities/dayOfWeek.entity";
import { DayOfWeekTypeOrmRepository } from "./dayOfWeek.typeorm.repository";
import { DayOfWeekRepository } from "./dayOfWeek.repository";

@Module({
    imports: [TypeOrmModule.forFeature([DayOfWeek])],
    providers: [DayOfWeekRepository, DayOfWeekTypeOrmRepository],
    exports: [DayOfWeekRepository]
})
export class DayOfWeekRepositoryModule {}