import { HttpStatus, Injectable } from "@nestjs/common";
import * as Joi from 'joi';
import BaseValidator from "src/infra/validator/baseValidator";
import RequestEnding from "src/infra/exceptions/RequestEnding";
import { CreateHabitUseCaseInput } from "./createHabit.usecase.input";

@Injectable()
export class CreateHabitValidator implements BaseValidator<CreateHabitUseCaseInput> {
    constructor() {}

    async validate(input: CreateHabitUseCaseInput): Promise<void> {
        const schema = Joi.object<CreateHabitUseCaseInput>({
            name: Joi
                .string()
                .required(),

            durationInMinutes: Joi
                .number()
                .required(),

            daysOfWeek: Joi
                .array()
                .items(Joi.number().valid(0, 1, 2, 3, 4, 5, 6))
                .required(),
            
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