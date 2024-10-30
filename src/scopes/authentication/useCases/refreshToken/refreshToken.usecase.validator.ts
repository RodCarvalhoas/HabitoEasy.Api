import { HttpStatus, Injectable } from "@nestjs/common";
import * as Joi from 'joi';
import BaseValidator from "src/infra/validator/baseValidator";
import RequestEnding from "src/infra/exceptions/RequestEnding";
import { RefreshTokenUseCaseInput } from "./refreshToken.usecase.input";

@Injectable()
export class RefreshTokenUseCaseValidator implements BaseValidator<RefreshTokenUseCaseInput> {
    constructor() {}

    async validate(input: RefreshTokenUseCaseInput): Promise<void> {
        const schema = Joi.object<RefreshTokenUseCaseInput>({
            refreshToken: Joi
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