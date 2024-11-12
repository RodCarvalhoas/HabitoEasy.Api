import { Module } from "@nestjs/common";
import { GetUserDetailsValidator } from "./getUserDetails.usecase.validator";
import { GetUserDetailsUseCase } from "./getUserDetails.usecase";
import { AuthenticationUserQueryRepositoryModule } from "../../queries/repositories/authentication/authenticationUser.query.repository.module";

@Module({
    imports: [AuthenticationUserQueryRepositoryModule],
    providers: [GetUserDetailsValidator, GetUserDetailsUseCase],
    exports: [GetUserDetailsUseCase]
})
export class GetUserDetailsUseCaseModule{}