import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { HabitSchema, HabitSchemaModel } from "../../schemas/habit.schema";
import { HabitQueryRepository } from "./habit.query.repository";

@Module({
    imports: [MongooseModule.forFeature([{ name: HabitSchema.name, schema: HabitSchemaModel }])],
    providers: [HabitQueryRepository],
    exports: [HabitQueryRepository]
})
export class HabitQueryRepositoryModule {}