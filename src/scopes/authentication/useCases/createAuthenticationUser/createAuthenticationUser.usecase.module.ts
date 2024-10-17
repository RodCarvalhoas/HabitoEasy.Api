import { Module } from "@nestjs/common";
import { CreateAuthenticationUserValidator } from "./createAuthentcationUser.usecase.validator";
import { CreateAuthenticationUserUseCase } from "./createAuthenticationUser.usecase";
import { AuthenticationUserRepositoryModule } from "../../repositories/authenticationUser/authenticationUser.repository.module";
import { UserTokenGatewayModule } from "../../gateways/userToken/userToken.gateway.module";

@Module({
    imports: [AuthenticationUserRepositoryModule, UserTokenGatewayModule],
    providers: [CreateAuthenticationUserValidator, CreateAuthenticationUserUseCase],
    exports: [CreateAuthenticationUserUseCase]
})
export class CreateAuthenticationUserUseCaseModule{}