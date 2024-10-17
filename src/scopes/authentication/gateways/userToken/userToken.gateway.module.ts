import { Module } from "@nestjs/common";
import { UserTokenGateway } from "./userToken.gateway";

@Module({
    providers: [UserTokenGateway],
    exports: [UserTokenGateway]
})
export class UserTokenGatewayModule {}