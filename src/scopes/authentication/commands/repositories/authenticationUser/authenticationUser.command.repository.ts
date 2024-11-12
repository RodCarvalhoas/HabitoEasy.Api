import { Injectable } from "@nestjs/common";
import { AuthenticationUserCommandTypeOrmRepository } from "./authenticationUser.command.typeorm.repository";
import { AuthenticationUser } from "../../entities/authenticationUser.entity";

@Injectable()
export class AuthenticationUserCommandRepository {
    constructor(
        private readonly authenticationUserTypeOrmRepository: AuthenticationUserCommandTypeOrmRepository 
    ){}

    async create(authenticationUser: AuthenticationUser): Promise<AuthenticationUser> {
        return await this.authenticationUserTypeOrmRepository.save(authenticationUser);
    }

    async findByEmail(email: string): Promise<AuthenticationUser> {
        return await this.authenticationUserTypeOrmRepository.findOneBy({ email })
    }

    async findById(id: string): Promise<AuthenticationUser> {
        return await this.authenticationUserTypeOrmRepository.findOneBy({ id })
    }
}