import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthenticationUserSchema, AuthenticationUserSchemaModel } from "../../schemas/authenticationUser.schema";
import { AuthenticationUserQueryRepository } from "./authenticationUser.query.repository";

@Module({
    imports: [MongooseModule.forFeature([{ name: AuthenticationUserSchema.name, schema: AuthenticationUserSchemaModel }])],
    providers: [AuthenticationUserQueryRepository],
    exports: [AuthenticationUserQueryRepository]
})
export class AuthenticationUserQueryRepositoryModule {}