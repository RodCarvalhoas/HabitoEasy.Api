import { HttpStatus, Injectable } from "@nestjs/common";
import * as Joi from 'joi';
import BaseValidator from "src/infra/validator/baseValidator";
import RequestEnding from "src/infra/exceptions/RequestEnding";
import { ListAllUserHabitUseCaseInput } from "./listAllUserHabit.usecase.input";

@Injectable()
export class ListAllUserHabitValidator implements BaseValidator<ListAllUserHabitUseCaseInput> {
    constructor() {}

    async validate(input: ListAllUserHabitUseCaseInput): Promise<void> {
        const schema = Joi.object<ListAllUserHabitUseCaseInput>({
            userId: Joi
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