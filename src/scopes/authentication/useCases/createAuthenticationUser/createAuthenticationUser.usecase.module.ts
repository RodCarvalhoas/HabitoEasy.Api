import { Module } from "@nestjs/common";
import { CreateAuthenticationUserValidator } from "./createAuthentcationUser.usecase.validator";
import { CreateAuthenticationUserUseCase } from "./createAuthenticationUser.usecase";
import { AuthenticationUserRepositoryModule } from "../../repositories/authenticationUser/authenticationUser.repository.module";

@Module({
    imports: [AuthenticationUserRepositoryModule],
    providers: [CreateAuthenticationUserValidator, CreateAuthenticationUserUseCase],
    exports: [CreateAuthenticationUserUseCase]
})
export class CreateAuthenticationUserUseCaseModule{}