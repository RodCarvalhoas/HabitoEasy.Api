import { Injectable } from "@nestjs/common";
import { AuthenticationUserTypeOrmRepository } from "./authenticationUser.typeorm.repository";
import { AuthenticationUser } from "../../entities/authenticationUser.entity";

@Injectable()
export class AuthenticationUserRepository {
    constructor(
        private readonly authenticationUserTypeOrmRepository: AuthenticationUserTypeOrmRepository 
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