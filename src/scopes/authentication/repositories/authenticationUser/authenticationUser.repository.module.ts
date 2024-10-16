import { Module } from "@nestjs/common";
import { AuthenticationUserRepository } from "./authenticationUser.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthenticationUser } from "../../entities/authenticationUser.entity";

@Module({
    imports: [TypeOrmModule.forFeature([AuthenticationUser])],
    providers: [AuthenticationUserRepository],
    exports: [AuthenticationUserRepository]
})
export class AuthenticationUserRepositoryModule{}