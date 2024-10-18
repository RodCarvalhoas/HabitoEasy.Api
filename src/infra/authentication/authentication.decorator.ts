import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';

import { AuthenticationGuard } from './authentication.guard';
import { UserTypeGuard } from './usertype.guard';
import AuthenticationMetadata from './authenticationMetadata';

export const Authentication = (userTypes: string[], optional?: boolean) => {
    return applyDecorators(
        SetMetadata<string, AuthenticationMetadata>('authenticationMetadata', {
            userTypes,
            optional
        }),
        UseGuards(AuthenticationGuard),
        UseGuards(UserTypeGuard)
    )
}
