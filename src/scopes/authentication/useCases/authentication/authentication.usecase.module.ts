import { Module } from "@nestjs/common";
import { AuthenticationUserRepositoryModule } from "../../repositories/authenticationUser/authenticationUser.repository.module";
import { UserTokenGatewayModule } from "../../gateways/userToken/userToken.gateway.module";
import { AuthenticationUseCaseValidator } from "./authentication.usecase.validator";
import { AuthenticationUseCase } from "./authentication.usecase";

@Module({
    imports: [
        AuthenticationUserRepositoryModule,
        UserTokenGatewayModule
    ],
    providers: [AuthenticationUseCaseValidator, AuthenticationUseCase],
    exports: [AuthenticationUseCase]
})
export class AuthenticationUseCaseModule {}