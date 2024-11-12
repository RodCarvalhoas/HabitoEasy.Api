import { Module } from "@nestjs/common";
import { UserTokenGateway } from "./userToken.gateway";
import { AuthenticationUserCommandRepositoryModule } from "../../commands/repositories/authenticationUser/authenticationUser.command.repository.module";

@Module({
    imports: [AuthenticationUserCommandRepositoryModule],
    providers: [UserTokenGateway],
    exports: [UserTokenGateway]
})
export class UserTokenGatewayModule {}