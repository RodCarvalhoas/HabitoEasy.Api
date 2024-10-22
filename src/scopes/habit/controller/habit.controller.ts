import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { PinoLogger } from "nestjs-pino";
import { Authentication } from "src/infra/authentication/authentication.decorator";
import { UserTypes } from "src/infra/authentication/userTypes.enum";
import { CreateHabitUseCase } from "../useCases/createHabit/createHabit.usecase";
import { CreateHabitRequest } from "./transport/createHabit/createHabit.request";
import { CreateHabitResponse } from "./transport/createHabit/createHabit.response";
import { UserAccessToken } from "src/infra/authentication/userAccessToken.decorator";
import { AccessToken } from "src/scopes/authentication/gateways/userToken/interfaces/accessToken";

@Controller("/habit")
export class HabitController {
    constructor(
        private readonly logger: PinoLogger,
        private readonly createHabitUseCase: CreateHabitUseCase
    ){}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Authentication([UserTypes.DEFAULT_USER])
    async create(@Body() request: CreateHabitRequest, @UserAccessToken() accessToken: AccessToken): Promise<CreateHabitResponse> {
        this.logger.info(`useCase ${CreateHabitUseCase.name} started`);

        return await this.createHabitUseCase.execute({...request, userId: accessToken.userId})
    }
}