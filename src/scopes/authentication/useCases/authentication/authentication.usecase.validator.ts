import { HttpStatus, Injectable } from "@nestjs/common";
import * as Joi from 'joi';
import BaseValidator from "src/infra/validator/baseValidator";
import RequestEnding from "src/infra/exceptions/RequestEnding";
import { AuthenticationUseCaseInput } from "./authentication.usecase.input";

@Injectable()
export class AuthenticationUseCaseValidator implements BaseValidator<AuthenticationUseCaseInput> {
    constructor() {}

    async validate(input: AuthenticationUseCaseInput): Promise<void> {
        const schema = Joi.object<AuthenticationUseCaseInput>({
            email: Joi
                .string()
                .email()
                .required(),

            password: Joi
                .string()
                .required(),
        });

        const validation = await schema.validate(input);
        if (!!validation.error) {
            throw new RequestEnding(
                HttpStatus.BAD_REQUEST,
                {
                    logMessage: `Validation error: ${validation.error.message}`,
                    returnedData: { validationError: validation.error.message }
                }
            );
        }
    }
}