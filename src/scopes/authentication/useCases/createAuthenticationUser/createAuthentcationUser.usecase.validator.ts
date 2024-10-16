import { HttpStatus, Injectable } from "@nestjs/common";
import * as Joi from 'joi';
import { CreateAuthenticationUserUseCaseInput } from "./createAuthenticationUser.usecase.input";
import BaseValidator from "src/infra/validator/baseValidator";
import RequestEnding from "src/infra/exceptions/RequestEnding";

@Injectable()
export class CreateAuthenticationUserValidator implements BaseValidator<CreateAuthenticationUserUseCaseInput> {
    constructor() {}

    async validate(input: CreateAuthenticationUserUseCaseInput): Promise<void> {
        const schema = Joi.object<CreateAuthenticationUserUseCaseInput>({
            email: Joi
                .string()
                .email()
                .required(),

            password: Joi
                .string()
                .required(),

           name: Joi
                .string()
                .required()
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