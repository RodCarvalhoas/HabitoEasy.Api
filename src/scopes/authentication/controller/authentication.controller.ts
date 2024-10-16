import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { PinoLogger } from "nestjs-pino";
import { CreateAuthenticationUserUseCase } from "../useCases/createAuthenticationUser/createAuthenticationUser.usecase";
import { RegisterRequest } from "./transport/register/register.request";

@Controller("/authentication")
export class AuthenticationController {
    constructor(
        private readonly logger: PinoLogger,
        private readonly createAuthenticationUseCase: CreateAuthenticationUserUseCase
    ){}

    @Post("/register")
    @HttpCode(HttpStatus.CREATED)
    async register(@Body() request: RegisterRequest) {
        this.logger.info(`useCase ${CreateAuthenticationUserUseCase.name} started`);

        await this.createAuthenticationUseCase.execute(request);
    }
}