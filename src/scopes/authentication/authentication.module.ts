import { Module } from "@nestjs/common";
import { AuthenticationUserCommandRepositoryModule } from "./commands/repositories/authenticationUser/authenticationUser.command.repository.module";
import { AuthenticationController } from "./controller/authentication.controller";
import { CreateAuthenticationUserUseCaseModule } from "./useCases/createAuthenticationUser/createAuthenticationUser.usecase.module";
import { AuthenticationUseCaseModule } from "./useCases/authentication/authentication.usecase.module";
import { RefreshTokenUseCaseModule } from "./useCases/refreshToken/refreshToken.usecase.module";
import { GetUserDetailsUseCaseModule } from "./useCases/getUserDetails/getUserDetails.usecase.module";
import { AuthenticationUserQueryRepositoryModule } from "./queries/repositories/authentication/authenticationUser.query.repository.module";
import { CreatedAuthenticationUserHandler } from "./events/handlers/createdAuthenticationUser.handler";

const EventHandlers = [CreatedAuthenticationUserHandler];

@Module({
    imports: [
        AuthenticationUserCommandRepositoryModule,
        CreateAuthenticationUserUseCaseModule,
        AuthenticationUseCaseModule,
        RefreshTokenUseCaseModule,
        GetUserDetailsUseCaseModule,
        AuthenticationUserQueryRepositoryModule
    ],
    providers: [...EventHandlers],
    controllers: [AuthenticationController]
})
export class AuthenticationModule{}