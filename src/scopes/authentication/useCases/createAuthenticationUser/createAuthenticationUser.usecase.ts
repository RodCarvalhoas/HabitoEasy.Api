import BaseUseCase from "src/infra/useCase/baseUseCase";
import { CreateAuthenticationUserUseCaseInput } from "./createAuthenticationUser.usecase.input";
import { CreateAuthenticationUserUseCaseOutput } from "./createAuthenticationUser.usecase.output";
import { PinoLogger } from "nestjs-pino";
import { ConflictException, Injectable } from "@nestjs/common";
import { CreateAuthenticationUserValidator } from "./createAuthentcationUser.usecase.validator";
import { AuthenticationUserRepository } from "../../repositories/authenticationUser/authenticationUser.repository";
import UserBuilder from "../../builders/user.builder";
import { UserTokenGateway } from "../../gateways/userToken/userToken.gateway";

@Injectable()
export class CreateAuthenticationUserUseCase implements BaseUseCase<CreateAuthenticationUserUseCaseInput, CreateAuthenticationUserUseCaseOutput> {
    constructor(
        private readonly logger: PinoLogger,
        private readonly validator: CreateAuthenticationUserValidator,
        private readonly authenticationUserRepository: AuthenticationUserRepository,
        private readonly userTokenGateway: UserTokenGateway
    ){}

    async execute(input: CreateAuthenticationUserUseCaseInput): Promise<CreateAuthenticationUserUseCaseOutput> {
        await this.validator.validate(input);

        const existsUser = await this.authenticationUserRepository.findByEmail(input.email);

        if(existsUser){
            this.logger.info(`User with email ${input.email} already registered`);
            throw new ConflictException();
        }

        const user = await this.authenticationUserRepository.create(
            UserBuilder.buildAuthenticationUser(
                'DEFAULT_USER', 
                input.name, 
                input.email, 
                input.password
            )
        );

        const [accessToken, refreshToken] = await this.userTokenGateway.generateTokens(user);
        
        this.logger.info(`User with email ${input.email} successfully registered`);
        return { accessToken, refreshToken }
    }
}