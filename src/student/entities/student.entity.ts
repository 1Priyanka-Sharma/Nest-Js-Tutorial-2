import { Type } from "class-transformer";
import { Classroom } from 'src/classroom/entities/classroom.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  // @ManyToOne(type => Classroom, {lazy: true})
  // classroom: Promise<Classroom>;
  // we use Promise<Classroom> only for strong typing
  
  // @ManyToOne(type => Classroom, {eager: true})
  @ManyToOne(type => Classroom, {eager: true,cascade:false})
  // @ManyToOne(type => Classroom)
  @JoinColumn({name: "classroom_id"})
  @Type(type => Classroom)
  classroom: Classroom;
}
// Eager relations are loaded automatically each time you load entities from the database (Using find() query)
// Now when you load Student you don't need to join or specify relations you want to load. 
// They will be loaded automatically.
// return this.studentRepository.find();
// Don't work on createQueryBuilder()-use leftJoinAndSelect to load the relation-

// {eager: true}-relations are automatiely loaded( in Student Db- classroom entity is visible)


