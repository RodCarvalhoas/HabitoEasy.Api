import { Module } from "@nestjs/common";
import { CreateAuthenticationUserValidator } from "./createAuthentcationUser.usecase.validator";
import { CreateAuthenticationUserUseCase } from "./createAuthenticationUser.usecase";
import { AuthenticationUserCommandRepositoryModule } from "../../commands/repositories/authenticationUser/authenticationUser.command.repository.module";
import { UserTokenGatewayModule } from "../../gateways/userToken/userToken.gateway.module";

@Module({
    imports: [AuthenticationUserCommandRepositoryModule, UserTokenGatewayModule],
    providers: [CreateAuthenticationUserValidator, CreateAuthenticationUserUseCase],
    exports: [CreateAuthenticationUserUseCase]
})
export class CreateAuthenticationUserUseCaseModule{}