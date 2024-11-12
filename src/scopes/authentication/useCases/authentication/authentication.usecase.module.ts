import { Module } from "@nestjs/common";
import { AuthenticationUserCommandRepositoryModule } from "../../commands/repositories/authenticationUser/authenticationUser.command.repository.module";
import { UserTokenGatewayModule } from "../../gateways/userToken/userToken.gateway.module";
import { AuthenticationUseCaseValidator } from "./authentication.usecase.validator";
import { AuthenticationUseCase } from "./authentication.usecase";

@Module({
    imports: [
        AuthenticationUserCommandRepositoryModule,
        UserTokenGatewayModule
    ],
    providers: [AuthenticationUseCaseValidator, AuthenticationUseCase],
    exports: [AuthenticationUseCase]
})
export class AuthenticationUseCaseModule {}