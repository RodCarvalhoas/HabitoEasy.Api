import { DayOfWeek } from "../commands/entities/dayOfWeek.entity";
import { Habit } from "../commands/entities/habit.entity";

export default class DayOfWeekBuilder {
    public static buildDaysOfWeek(days: number[], habit: Habit): DayOfWeek[] {
        return days.map(num => {
            return new DayOfWeek(num, habit);
        })
    }
}   