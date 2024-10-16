import { Module } from "@nestjs/common";
import { AuthenticationUserRepository } from "./authenticationUser.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthenticationUser } from "../../entities/authenticationUser.entity";
import { AuthenticationUserTypeOrmRepository } from "./authenticationUser.typeorm.repository";

@Module({
    imports: [TypeOrmModule.forFeature([AuthenticationUser])],
    providers: [AuthenticationUserRepository, AuthenticationUserTypeOrmRepository],
    exports: [AuthenticationUserRepository]
})
export class AuthenticationUserRepositoryModule{}