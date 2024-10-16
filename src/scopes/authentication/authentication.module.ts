import { Module } from "@nestjs/common";
import { AuthenticationUserRepositoryModule } from "./repositories/authenticationUser/authenticationUser.repository.module";

@Module({
    imports: [AuthenticationUserRepositoryModule]
})
export class AuthenticationModule{}