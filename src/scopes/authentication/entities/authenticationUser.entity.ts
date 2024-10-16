import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "AUTHENTICATION_USER" })
export class AuthenticationUser {
    @PrimaryGeneratedColumn('uuid', { name: "ID" })
    id: string;

    @Column({ name: "NAME" })
    name: string

    @Column({ name: "EMAIL" })
    email: string;

    @Column({ name: "PASSWORD" })
    password: string;

    @Column({ name: 'USER_TYPE' })
    userType: string;

    @CreateDateColumn({ name: "CREATED_AT" })
    createdAt: Date;

    @UpdateDateColumn({ name: "UPDATE_AT" })
    updatedAt: Date;
}