import { Module } from "@nestjs/common";
import { UserTokenGatewayModule } from "../../gateways/userToken/userToken.gateway.module";
import { RefreshTokenUseCaseValidator } from "./refreshToken.usecase.validator";
import { RefreshTokenUseCase } from "./refreshToken.usecase";

@Module({
    imports: [
        UserTokenGatewayModule
    ],
    providers: [RefreshTokenUseCaseValidator, RefreshTokenUseCase],
    exports: [RefreshTokenUseCase]
})
export class RefreshTokenUseCaseModule {}