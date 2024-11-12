import BaseUseCase from "src/infra/useCase/baseUseCase";
import { CreateAuthenticationUserUseCaseInput } from "./createAuthenticationUser.usecase.input";
import { CreateAuthenticationUserUseCaseOutput } from "./createAuthenticationUser.usecase.output";
import { PinoLogger } from "nestjs-pino";
import { ConflictException, Injectable } from "@nestjs/common";
import { CreateAuthenticationUserValidator } from "./createAuthentcationUser.usecase.validator";
import { AuthenticationUserCommandRepository } from "../../commands/repositories/authenticationUser/authenticationUser.command.repository";
import UserBuilder from "../../builders/user.builder";
import { UserTokenGateway } from "../../gateways/userToken/userToken.gateway";
import { UserTypes } from "src/infra/authentication/userTypes.enum";
import { EventPublisher } from "src/scopes/event/services/publisher/eventPublisher";
import { CreatedAuthenticationUserEvent } from "../../events/Impl/createdAuthenticationUser.event";

@Injectable()
export class CreateAuthenticationUserUseCase implements BaseUseCase<CreateAuthenticationUserUseCaseInput, CreateAuthenticationUserUseCaseOutput> {
    constructor(
        private readonly logger: PinoLogger,
        private readonly validator: CreateAuthenticationUserValidator,
        private readonly authenticationUserRepository: AuthenticationUserCommandRepository,
        private readonly userTokenGateway: UserTokenGateway,
        private readonly eventPublisher: EventPublisher,
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
                UserTypes.DEFAULT_USER, 
                input.name, 
                input.email, 
                input.password
            )
        );

        this.eventPublisher.publish(
            new CreatedAuthenticationUserEvent(
                user.id,
                user.name,
                user.email
            )
        )

        const [accessToken, refreshToken] = await this.userTokenGateway.generateTokens(user);
        
        this.logger.info(`User with email ${input.email} successfully registered`);
        return { accessToken, refreshToken }
    }
}