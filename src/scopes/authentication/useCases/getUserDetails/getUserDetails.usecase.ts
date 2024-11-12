import BaseUseCase from "src/infra/useCase/baseUseCase";
import { GetUserDetailsUseCaseInput } from "./getUserDetails.usecase.input";
import { GetUserDetailsUseCaseOutput } from "./getUserDetails.usecase.output";
import { PinoLogger } from "nestjs-pino";
import { Injectable, NotFoundException } from "@nestjs/common";
import { GetUserDetailsValidator } from "./getUserDetails.usecase.validator";
import { AuthenticationUserQueryRepository } from "../../queries/repositories/authentication/authenticationUser.query.repository";

@Injectable()
export class GetUserDetailsUseCase implements BaseUseCase<GetUserDetailsUseCaseInput, GetUserDetailsUseCaseOutput> {
    constructor(
        private readonly logger: PinoLogger,
        private readonly validator: GetUserDetailsValidator,
        private readonly authenticationUserQueryRepository: AuthenticationUserQueryRepository,
    ){}

    async execute(input: GetUserDetailsUseCaseInput): Promise<GetUserDetailsUseCaseOutput> {
        await this.validator.validate(input);

        const existsUser = await this.authenticationUserQueryRepository.findById(input.userId);

        if(!existsUser)
            throw new NotFoundException(`User with id: ${input.userId} not found`)
        
        this.logger.info(`User with id: ${input.userId} fetched with successfully`);

        return {
            email: existsUser.email,
            name: existsUser.name
        }
    }
}