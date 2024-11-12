import { Repository } from "typeorm";
import { InjectRepository } from '@nestjs/typeorm';
import { AuthenticationUser } from "../../entities/authenticationUser.entity";

export class AuthenticationUserCommandTypeOrmRepository extends Repository<AuthenticationUser> {
    constructor(
        @InjectRepository(AuthenticationUser)
        private readonly authenticationUserRepository: Repository<AuthenticationUser>
    ){
        super(authenticationUserRepository.target, authenticationUserRepository.manager, authenticationUserRepository.queryRunner);
    }
}