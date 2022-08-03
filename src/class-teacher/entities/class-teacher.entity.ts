import { Type } from "class-transformer";
import { Classroom } from 'src/classroom/entities/classroom.entity';
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne } from 'typeorm';

@Entity()
export class ClassTeacher {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @OneToOne(type => Classroom, {eager: true})
    @JoinColumn({ name: " ClassroomID" })
    @Type(type => Classroom)
    classroomId: Classroom
}