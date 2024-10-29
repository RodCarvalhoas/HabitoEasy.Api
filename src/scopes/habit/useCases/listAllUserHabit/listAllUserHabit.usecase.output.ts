export interface ListAllUserHabitUseCaseOutput {
    userHabit: UserHabit[]
}

export interface UserHabit {
    id: string;
    name: string;
    durationInMinutes: number;
    daysOfWeek: number[];
}