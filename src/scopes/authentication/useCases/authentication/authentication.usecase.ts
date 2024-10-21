import { UserTokenGateway } from './../../gateways/userToken/userToken.gateway';
import { HttpStatus, Injectable } from "@nestjs/common";
import BaseUseCase from "src/infra/useCase/baseUseCase";
import { AuthenticationUseCaseInput } from "./authentication.usecase.input";
import { AuthenticationUseCaseOutput } from "./authentication.usecase.output";
import { PinoLogger } from "nestjs-pino";
import { AuthenticationUseCaseValidator } from "./authentication.usecase.validator";
import { AuthenticationUserRepository } from "../../repositories/authenticationUser/authenticationUser.repository";
import RequestEnding from "src/infra/exceptions/RequestEnding";
import SecurityHelper from "src/scopes/authentication/helpers/SecurityHelper";

@Injectable()
export class AuthenticationUseCase implements BaseUseCase<AuthenticationUseCaseInput, AuthenticationUseCaseOutput> {
    constructor(
        private readonly logger: PinoLogger,
        private readonly validator: AuthenticationUseCaseValidator,
        private readonly authenticationUserRepository: AuthenticationUserRepository,
        private readonly userTokenGateway: UserTokenGateway
    ){}
    
    async execute(input: AuthenticationUseCaseInput): Promise<AuthenticationUseCaseOutput> {
        await this.validator.validate(input);

        const user = await this.authenticationUserRepository.findByEmail(input.email);

        if(!user)
            throw new RequestEnding(HttpStatus.FORBIDDEN);

        if(!SecurityHelper.IsHashVerified(user.password, input.password))
            throw new RequestEnding(HttpStatus.FORBIDDEN);

        const [accessToken, refreshToken] = await this.userTokenGateway.generateTokens(user);

        this.logger.info('Successfully loged in');
        return { accessToken, refreshToken }
    }
}