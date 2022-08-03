import { Student } from 'src/student/entities/student.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Classroom {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  maxstudents: number;

  @OneToMany(() => Student, (student) => student.classroom,{eager:true})
  students: Student[];
}
