import { DayOfWeek } from "../entities/dayOfWeek.entity";
import { Habit } from "../entities/habit.entity";

export default class DayOfWeekBuilder {
    public static buildDaysOfWeek(days: number[], habit: Habit): DayOfWeek[] {
        return days.map(num => {
            return new DayOfWeek(num, habit);
        })
    }
}   