import { DayOfWeekSchema } from "../../queries/schemas/dayOfWeek.schema";

export class UserCreateHabitEvent {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly durationInMinutes: number,
        public readonly daysOfWeek: DayOfWeekSchema[],
        public readonly userId: string,
    ){}
  }