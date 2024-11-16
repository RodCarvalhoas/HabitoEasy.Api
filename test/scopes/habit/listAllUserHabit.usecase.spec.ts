import { randomUUID } from 'crypto';
import { Test, TestingModule } from "@nestjs/testing";
import { PinoLogger } from "nestjs-pino";
import { ListAllUserHabitUseCase } from "src/scopes/habit/useCases/listAllUserHabit/listAllUserHabit.usecase";
import { ListAllUserHabitUseCaseInput } from "src/scopes/habit/useCases/listAllUserHabit/listAllUserHabit.usecase.input";
import { ListAllUserHabitUseCaseOutput } from "src/scopes/habit/useCases/listAllUserHabit/listAllUserHabit.usecase.output";
import { ListAllUserHabitValidator } from "src/scopes/habit/useCases/listAllUserHabit/listAllUserHabit.usecase.validator";
import { HabitQueryRepository } from "src/scopes/habit/queries/repositories/habit/habit.query.repository";
import { HabitSchema } from "src/scopes/habit/queries/schemas/habit.schema";

const userId = "test-user-id";

const habitSchema: HabitSchema = {
    _id: "habit-1",
    name: "Morning Run",
    durationInMinutes: 30,
    authenticationUser: userId,
    daysOfWeek: [
        { _id: randomUUID(), day: 0, habit: randomUUID() },
        { _id: randomUUID(), day: 2, habit: randomUUID() },
        { _id: randomUUID(), day: 4, habit: randomUUID() },
    ]
};

const habitsMock: HabitSchema[] = [habitSchema];

const listAllUserHabitInput: ListAllUserHabitUseCaseInput = {
    userId,
};

const listAllUserHabitOutput: ListAllUserHabitUseCaseOutput = {
    userHabit: [
        {
            id: habitSchema._id,
            name: habitSchema.name,
            durationInMinutes: habitSchema.durationInMinutes,
            daysOfWeek: habitSchema.daysOfWeek.map(d => d.day),
        },
    ],
};

describe("ListAllUserHabit UseCase", () => {
    let listAllUserHabitUseCase: ListAllUserHabitUseCase;
    let logger: PinoLogger;
    let validator: ListAllUserHabitValidator;
    let habitQueryRepository: HabitQueryRepository;

    beforeEach(async () => {
        const testModule: TestingModule = await Test.createTestingModule({
            providers: [
                ListAllUserHabitUseCase,
                ListAllUserHabitValidator,
                {
                    provide: PinoLogger,
                    useValue: {
                        info: jest.fn(),
                    },
                },
                {
                    provide: HabitQueryRepository,
                    useValue: {
                        findAllByUserId: jest.fn().mockResolvedValue(habitsMock),
                    },
                },
            ],
        }).compile();

        listAllUserHabitUseCase = testModule.get<ListAllUserHabitUseCase>(ListAllUserHabitUseCase);
        logger = testModule.get<PinoLogger>(PinoLogger);
        validator = testModule.get<ListAllUserHabitValidator>(ListAllUserHabitValidator);
        habitQueryRepository = testModule.get<HabitQueryRepository>(HabitQueryRepository);
    });

    it("Should be defined", () => {
        expect(listAllUserHabitUseCase).toBeDefined();
        expect(logger).toBeDefined();
        expect(validator).toBeDefined();
        expect(habitQueryRepository).toBeDefined();
    });

    it("Should fetch all habits successfully", async () => {
        const result = await listAllUserHabitUseCase.execute(listAllUserHabitInput);

        expect(result).toEqual(listAllUserHabitOutput);
        expect(habitQueryRepository.findAllByUserId).toHaveBeenCalledWith(userId);
        expect(logger.info).toHaveBeenCalledWith(`Successfully fetched habits for user ${userId}`);
    });

    it("Should throw an error if validation fails", async () => {
        jest.spyOn(validator, "validate").mockRejectedValueOnce(new Error("Validation error"));

        const result = listAllUserHabitUseCase.execute(listAllUserHabitInput);

        await expect(result).rejects.toThrow("Validation error");
        expect(habitQueryRepository.findAllByUserId).toHaveBeenCalledTimes(0);
        expect(logger.info).toHaveBeenCalledTimes(0);
    });

    it("Should handle repository errors gracefully", async () => {
        jest.spyOn(habitQueryRepository, "findAllByUserId").mockRejectedValueOnce(new Error("Repository error"));

        const result = listAllUserHabitUseCase.execute(listAllUserHabitInput);

        await expect(result).rejects.toThrow("Repository error");
        expect(logger.info).toHaveBeenCalledTimes(0);
    });
});