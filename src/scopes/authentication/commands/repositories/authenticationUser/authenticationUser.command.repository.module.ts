import { Module } from "@nestjs/common";
import { AuthenticationUserCommandRepository } from "./authenticationUser.command.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthenticationUser } from "../../entities/authenticationUser.entity";
import { AuthenticationUserCommandTypeOrmRepository } from "./authenticationUser.command.typeorm.repository";

@Module({
    imports: [TypeOrmModule.forFeature([AuthenticationUser])],
    providers: [AuthenticationUserCommandRepository, AuthenticationUserCommandTypeOrmRepository],
    exports: [AuthenticationUserCommandRepository]
})
export class AuthenticationUserCommandRepositoryModule{}