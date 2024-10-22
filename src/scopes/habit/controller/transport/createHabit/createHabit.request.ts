export interface CreateHabitRequest {
    name: string;
    durationInMinutes: number;
    daysOfWeek: number[];
}