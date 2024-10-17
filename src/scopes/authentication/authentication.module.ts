import { Module } from "@nestjs/common";
import { AuthenticationUserRepositoryModule } from "./repositories/authenticationUser/authenticationUser.repository.module";
import { AuthenticationController } from "./controller/authentication.controller";
import { CreateAuthenticationUserUseCaseModule } from "./useCases/createAuthenticationUser/createAuthenticationUser.usecase.module";
import { AuthenticationUseCaseModule } from "./useCases/authentication/authentication.usecase.module";

@Module({
    imports: [
        AuthenticationUserRepositoryModule,
        CreateAuthenticationUserUseCaseModule,
        AuthenticationUseCaseModule
    ],
    controllers: [AuthenticationController]
})
export class AuthenticationModule{}