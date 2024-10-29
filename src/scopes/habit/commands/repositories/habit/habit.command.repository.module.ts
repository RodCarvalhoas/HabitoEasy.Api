import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Habit } from "../../entities/habit.entity";
import { HabitCommandRepository } from "./habit.command.repository";
import { HabitCommandTypeOrmRepository } from "./habit.command.typeorm.repository";

@Module({
    imports: [TypeOrmModule.forFeature([Habit])],
    providers: [HabitCommandRepository, HabitCommandTypeOrmRepository],
    exports: [HabitCommandRepository]
})
export class HabitCommandRepositoryModule {}