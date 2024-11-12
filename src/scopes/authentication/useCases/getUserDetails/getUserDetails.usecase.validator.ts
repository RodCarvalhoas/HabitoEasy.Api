import { HttpStatus, Injectable } from "@nestjs/common";
import * as Joi from 'joi';
import { GetUserDetailsUseCaseInput } from "./getUserDetails.usecase.input";
import BaseValidator from "src/infra/validator/baseValidator";
import RequestEnding from "src/infra/exceptions/RequestEnding";

@Injectable()
export class GetUserDetailsValidator implements BaseValidator<GetUserDetailsUseCaseInput> {
    constructor() {}

    async validate(input: GetUserDetailsUseCaseInput): Promise<void> {
        const schema = Joi.object<GetUserDetailsUseCaseInput>({
            userId: Joi
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