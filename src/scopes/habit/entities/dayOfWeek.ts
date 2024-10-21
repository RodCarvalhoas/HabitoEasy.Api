import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Habit } from "./habit.entity";

@Entity({ name: "DAY_OF_WEEK" })
export class DayOfWeek {
    @PrimaryGeneratedColumn('uuid', { name: "ID" })
    id: string;

    @Column({ name: "DAY" })
    day: number;

    @ManyToOne(() => Habit, (habit) => habit.daysOfWeek)
    @JoinColumn({ name: "HABIT" })
    habit: Habit;
}