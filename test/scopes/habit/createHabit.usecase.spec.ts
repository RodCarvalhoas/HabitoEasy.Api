import { Test, TestingModule } from "@nestjs/testing";
import { PinoLogger } from "nestjs-pino";
import { randomUUID } from "crypto";
import { Habit } from "src/scopes/habit/commands/entities/habit.entity";
import { HabitCommandRepository } from "src/scopes/habit/commands/repositories/habit/habit.command.repository";
import { CreateHabitUseCase } from "src/scopes/habit/useCases/createHabit/createHabit.usecase";
import { CreateHabitUseCaseInput } from "src/scopes/habit/useCases/createHabit/createHabit.usecase.input";
import { CreateHabitUseCaseOutput } from "src/scopes/habit/useCases/createHabit/createHabit.usecase.output";
import { CreateHabitValidator } from "src/scopes/habit/useCases/createHabit/createHabit.usecase.validator";
import { AuthenticationUser } from "src/scopes/authentication/commands/entities/authenticationUser.entity";
import { EventPublisher } from "src/scopes/event/services/publisher/eventPublisher";

const habitId = randomUUID();

const habit: Habit = {
    id: habitId,
    name: "Morning Run",
    durationInMinutes: 30,
    authenticationUser: { id: randomUUID() } as AuthenticationUser,
    daysOfWeek: [
        { id: randomUUID(), day: 0, habit: {id: habitId} as Habit },
        { id: randomUUID(), day: 1, habit: {id: habitId} as Habit }
    ]
};

const createHabitInput: CreateHabitUseCaseInput = {
    name: "Morning Run",
    durationInMinutes: 30,
    userId: randomUUID(),
    daysOfWeek: [0, 1]
};

const createHabitOutput: CreateHabitUseCaseOutput = {
    id: habit.id,
    name: habit.name
};

describe("CreateHabit UseCase", () => {
    let createHabitUseCase: CreateHabitUseCase;
    let logger: PinoLogger;
    let validator: CreateHabitValidator;
    let habitRepository: HabitCommandRepository;
    let eventPublisher: EventPublisher;

    beforeEach(async () => {
        const testModule: TestingModule = await Test.createTestingModule({
            providers: [
                CreateHabitUseCase,
                CreateHabitValidator,
                {
                    provide: HabitCommandRepository,
                    useValue: {
                        create: jest.fn().mockResolvedValue(habit)
                    }
                },
                {
                    provide: PinoLogger,
                    useValue: {
                        info: jest.fn()
                    }
                },
                {
                    provide: EventPublisher,
                    useValue: {
                        publish: jest.fn()
                    }
                }
            ]
        }).compile();

        createHabitUseCase = testModule.get<CreateHabitUseCase>(CreateHabitUseCase);
        logger = testModule.get<PinoLogger>(PinoLogger);
        validator = testModule.get<CreateHabitValidator>(CreateHabitValidator);
        habitRepository = testModule.get<HabitCommandRepository>(HabitCommandRepository);
        eventPublisher = testModule.get<EventPublisher>(EventPublisher);
    });

    it("Should be defined", () => {
        expect(createHabitUseCase).toBeDefined();
        expect(habitRepository).toBeDefined();
        expect(logger).toBeDefined();
        expect(validator).toBeDefined();
        expect(eventPublisher).toBeDefined();
    });

    it("Should create a habit successfully", async () => {
        const result = await createHabitUseCase.execute(createHabitInput);

        expect(result).toEqual(createHabitOutput);
        expect(habitRepository.create).toHaveBeenCalledTimes(1);
        expect(eventPublisher.publish).toHaveBeenCalledTimes(1);
    });

    it("Should throw an error if validation fails", async () => {
        jest.spyOn(validator, "validate").mockRejectedValueOnce(new Error());

        const result = createHabitUseCase.execute(createHabitInput);

        await expect(result).rejects.toThrow(new Error());
        expect(habitRepository.create).toHaveBeenCalledTimes(0);
        expect(eventPublisher.publish).toHaveBeenCalledTimes(0);
    });

    it("Should handle repository errors gracefully", async () => {
        jest.spyOn(habitRepository, "create").mockRejectedValueOnce(new Error("Repository error"));

        const result = createHabitUseCase.execute(createHabitInput);

        await expect(result).rejects.toThrow("Repository error");
        expect(habitRepository.create).toHaveBeenCalledTimes(1);
        expect(eventPublisher.publish).toHaveBeenCalledTimes(0);
    });
});
