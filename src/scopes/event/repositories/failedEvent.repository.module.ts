import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { FailedEventSchema, FailedEventSchemaModel } from "../schemas/failedEvent.schema";
import { FailedEventRepository } from "./failedEvent.repository";

@Module({
    imports: [MongooseModule.forFeature([{ name: FailedEventSchema.name, schema: FailedEventSchemaModel}])],
    providers: [FailedEventRepository],
    exports: [FailedEventRepository]
})
export class FailedEventRepositoryModule {}