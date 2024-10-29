import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Habit } from "../../entities/habit.entity";
import { HabitRepository } from "./habit.repository";
import { HabitTypeOrmRepository } from "./habit.typeorm.repository";

@Module({
    imports: [TypeOrmModule.forFeature([Habit])],
    providers: [HabitRepository, HabitTypeOrmRepository],
    exports: [HabitRepository]
})
export class HabitRepositoryModule {}