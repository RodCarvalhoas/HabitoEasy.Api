import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DayOfWeek } from "./dayOfWeek.entity";
import { AuthenticationUser } from "src/scopes/authentication/entities/authenticationUser.entity";

@Entity({ name: "HABIT" })
export class Habit {
    @PrimaryGeneratedColumn('uuid', { name: "ID" })
    id: string;

    @Column({ name: 'NAME' })
    name: string;

    @Column({ name: 'DURATION_IN_MINUTES' })
    durationInMinutes: number;

    @OneToMany(() => DayOfWeek, (dayOfWeek) => dayOfWeek.habit, { cascade: true })
    daysOfWeek: DayOfWeek[];

    @ManyToOne(() => AuthenticationUser)
    @JoinColumn({ name: "AUTHENTICATION_USER" })
    authenticationUser: AuthenticationUser;

    constructor(name: string, durationInMinutes: number){
        this.name = name;
        this.durationInMinutes = durationInMinutes;
    }
}