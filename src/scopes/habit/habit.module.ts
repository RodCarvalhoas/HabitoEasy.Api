import { Module } from "@nestjs/common";
import { HabitRepositoryModule } from "./repositories/habit/habit.repository.module";

@Module({
    imports: [
        HabitRepositoryModule
    ]
})
export class HabitModule {} 