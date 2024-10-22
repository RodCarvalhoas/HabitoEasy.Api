export interface CreateHabitUseCaseInput {
    name: string;
    durationInMinutes: number;
    daysOfWeek: number[];
    userId: string;
}