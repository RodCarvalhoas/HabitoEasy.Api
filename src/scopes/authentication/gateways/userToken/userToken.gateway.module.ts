import { Module } from "@nestjs/common";
import { UserTokenGateway } from "./userToken.gateway";
import { AuthenticationUserRepositoryModule } from "../../repositories/authenticationUser/authenticationUser.repository.module";

@Module({
    imports: [AuthenticationUserRepositoryModule],
    providers: [UserTokenGateway],
    exports: [UserTokenGateway]
})
export class UserTokenGatewayModule {}