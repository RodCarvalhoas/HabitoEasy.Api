interface BaseValidator<TInput> {
    validate(input: TInput): Promise<void>;
}

export default BaseValidator;