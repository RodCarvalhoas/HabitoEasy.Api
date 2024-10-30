import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { PinoLogger } from "nestjs-pino";
import { CreateAuthenticationUserUseCase } from "../useCases/createAuthenticationUser/createAuthenticationUser.usecase";
import { RegisterRequest } from "./transport/register/register.request";
import { LoginRequest } from "./transport/login/login.request";
import { LoginResponse } from "./transport/login/login.response";
import { AuthenticationUseCase } from "../useCases/authentication/authentication.usecase";
import { RegisterResponse } from "./transport/register/register.response";
import { RefreshRequest } from "./transport/refresh/refresh.request";
import { RefreshTokenUseCase } from "../useCases/refreshToken/refreshToken.usecase";

@Controller("/authentication")
export class AuthenticationController {
    constructor(
        private readonly logger: PinoLogger,
        private readonly createAuthenticationUseCase: CreateAuthenticationUserUseCase,
        private readonly authenticationUseCase: AuthenticationUseCase,
        private readonly refreshTokenUseCase: RefreshTokenUseCase
    ){}

    @Post("/register")
    @HttpCode(HttpStatus.CREATED)
    async register(@Body() request: RegisterRequest): Promise<RegisterResponse> {
        this.logger.info(`useCase ${CreateAuthenticationUserUseCase.name} started`);

        return await this.createAuthenticationUseCase.execute(request);
    }

    @Post("/login")
    @HttpCode(HttpStatus.OK)
    async login(@Body() request: LoginRequest): Promise<LoginResponse> {
        this.logger.info(`useCase ${AuthenticationUseCase.name} started`);

        return await this.authenticationUseCase.execute(request);
    }

    @Post("/refresh")
    @HttpCode(HttpStatus.OK)
    async refresh(@Body() request: RefreshRequest): Promise<RefreshRequest>  {
        this.logger.info(`useCase ${RefreshTokenUseCase.name} started`);

        return await this.refreshTokenUseCase.execute(request);
    }
}