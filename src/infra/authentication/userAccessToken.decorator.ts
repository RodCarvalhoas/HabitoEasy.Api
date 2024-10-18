import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { AccessToken } from "src/scopes/authentication/gateways/userToken/interfaces/accessToken";

export const UserAccessToken = createParamDecorator((data, ctx: ExecutionContext): AccessToken => {
    const request = ctx.switchToHttp().getRequest();
    return request.user
});