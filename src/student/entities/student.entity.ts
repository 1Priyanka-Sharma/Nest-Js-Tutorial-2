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

  // classroom: Promise<Classroom>;
  // we use Promise<Classroom> only for strong typing
  
  // @ManyToOne(type => Classroom, {lazy: true})
  // @ManyToOne(type => Classroom, {eager: true,cascade:false})
  
  
  // No need to provide second argument because Student(Owner) can always access the Classroom with its properties.
  // @ManyToOne(type => Classroom)
  @ManyToOne(type => Classroom, {eager: true})
  @JoinColumn({name: "classroom"})
  @Type(type => Classroom)
  classroom: Classroom;
}


// Eager relations are loaded automatically each time you load entities from the database (Using find() query)
// Now when you load Student you don't need to join or specify relations you want to load. 
// They will be loaded automatically.
// return this.studentRepository.find();
// Don't work on createQueryBuilder()-use leftJoinAndSelect to load the relation-

// {eager: true}-relations are automatiely loaded( find()-in Student Db- classroom entity is visible)


