import { Module } from "@nestjs/common";
import { AuthenticationUserRepositoryModule } from "./repositories/authenticationUser/authenticationUser.repository.module";
import { AuthenticationController } from "./controller/authentication.controller";
import { CreateAuthenticationUserUseCaseModule } from "./useCases/createAuthenticationUser/createAuthenticationUser.usecase.module";
import { AuthenticationUseCaseModule } from "./useCases/authentication/authentication.usecase.module";
import { RefreshTokenUseCaseModule } from "./useCases/refreshToken/refreshToken.usecase.module";

@Module({
    imports: [
        AuthenticationUserRepositoryModule,
        CreateAuthenticationUserUseCaseModule,
        AuthenticationUseCaseModule,
        RefreshTokenUseCaseModule
    ],
    controllers: [AuthenticationController]
})
export class AuthenticationModule{}