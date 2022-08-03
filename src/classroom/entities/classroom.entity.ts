import { Student } from 'src/student/entities/student.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import { Type } from "class-transformer";


@Entity()
export class Classroom {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  maxstudents: number;

  // Entity 2=student(Owner) entity 1= Classroom
  // @OneToMany(type => Student, student => student.classroom,{cascade:true})
  // @OneToMany(type => Student, student => student.classroom,{cascade:false})


  // First Argument is class of the entity with which we want to make our relationship.
  // Second Argument is passed to make this relation bi-directional (i.e.classroom can access student table).
  // @OneToMany(type => Student, student => student.classroom,{eager:true})
  @OneToMany(type => Student, student => student.classroom)
  @Type(type => Student)
  students: Student[]; 

}


// Entities in lazy relations are loaded once they are being accessed. 
// Such relations must have Promise as type - you store your value in a promise, and when you load them a promise is returned as well.
//  categories: Promise<Category[]>
// const question = new Question()
// To save such entity.
// question.categories = Promise.resolve([category1, category2])
// await dataSource.manager.save(question)



// Eager relations are loaded automatically each time you load entities from the database (Using find() query)
// Relation will be loaded automatically by - return this.studentRepository.find();
// Now when I load Student I don't need to join or specify relations I want to load. 
// Don't work on createQueryBuilder()-use leftJoinAndSelect to load the relation-

// Entities in lazy relations are loaded once they are being accessed. 
// Have Promise as type - value is stored in a promise, and promise is returned 
//  like-  categories: Promise<Category[]>
// To save such entity. use Promise.resolve()



//cascade- If set to true, the related object will be inserted and updated in the database.
// cascade options ("insert" | "update" | "remove" | "soft-remove" | "recover")[].

//  { cascade: ["insert"] }   
// Cascade insert here means if there is a new PostDetails instance set
// on this relation, it will be inserted automatically to the db when you save this Post entity

//  { cascade: ["update"] }   
// Cascade update here means if there are changes to an existing PostImage, it
// will be updated automatically to the db when you save this Post entity

// {cascade:false}-delete by id-wil not work 

// Cascade:true should be used when tables are dependent or closely related.
// Ex- Student and student Address tables are dependent. Student address table can't exist without Student.
// Now, if cascade:true in Student Table then any change in Student will automatiely reflect in Student Address  table
// But we can't do cascade:true in Student Address Table because on changing address there is no need to update student detail.

