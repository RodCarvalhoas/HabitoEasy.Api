import { UserTokenGateway } from '../../gateways/userToken/userToken.gateway';
import { Injectable } from "@nestjs/common";
import BaseUseCase from "src/infra/useCase/baseUseCase";
import { RefreshTokenUseCaseInput } from "./refreshToken.usecase.input";
import { RefreshTokenUseCaseOutput } from "./refreshToken.usecase.output";
import { PinoLogger } from "nestjs-pino";
import { RefreshTokenUseCaseValidator } from "./refreshToken.usecase.validator";

@Injectable()
export class RefreshTokenUseCase implements BaseUseCase<RefreshTokenUseCaseInput, RefreshTokenUseCaseOutput> {
    constructor(
        private readonly logger: PinoLogger,
        private readonly validator: RefreshTokenUseCaseValidator,
        private readonly userTokenGateway: UserTokenGateway
    ){}
    
    async execute(input: RefreshTokenUseCaseInput): Promise<RefreshTokenUseCaseOutput> {
        await this.validator.validate(input);

        const [accessToken, refreshToken] = await this.userTokenGateway.handleRefreshToken(input.refreshToken);

        this.logger.info('Successfully refreshed token');
        return { accessToken, refreshToken }
    }
}