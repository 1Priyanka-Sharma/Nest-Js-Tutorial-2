import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentService {
<<<<<<< HEAD
 
  // Inject Student rep
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const newStudent = await this.studentRepository.create(createStudentDto);
=======
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>, // @InjectRepository(Classroom) // private readonly classroomRepository: Repository<Classroom>
  ) { }

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const newStudent = await this.studentRepository.create(createStudentDto);

    let totalStudentsQuery = await this.studentRepository
      .createQueryBuilder('student')
      .leftJoinAndSelect('student.classroom', 'maxstud')
      .select('COUNT(student.id) AS Students')
      .addSelect('MAX( maxstud.maxstudents) AS maxStudents')
      .addSelect('student.classroom.id', 'Classroom_ID')
      .groupBy('student.classroom.id')
      .getRawMany();

    for (const element of totalStudentsQuery) {
      if (element.Classroom_ID == newStudent.classroom.id) {
        if (element.students < element.maxstudents) {
          await this.studentRepository.save(newStudent);
          return newStudent;
        } else {
          throw new HttpException(
            'Classroom size exceeds',
            HttpStatus.BAD_REQUEST,
          );
        }
      }
    }
>>>>>>> 3758e2dd493b3456c76a35f83b076a9e4b600c17
    await this.studentRepository.save(newStudent);
    return newStudent;
  }

<<<<<<< HEAD
  // findAll(): Promise<Student[]> {
  //   return this.studentRepository.find();
  // }
  async findAll(){
    // return this.studentRepository.find();
      // return await this.studentRepository.createQueryBuilder("student").select("Classroom.id");

  }

    async findTotalStudents() {
  //     // return this.studentRepository.createQueryBuilder("student").select("student.cid").groupBy("student.cid")
  //     // return await this.studentRepository.createQueryBuilder("student").distinctOn(["student.cid"])
  // // .from(Student, "stud")
  // const student = await this.studentRepository
  //     .createQueryBuilder()
  //     .select("cid")
  //     .from(Student, "student");
  //     return student;
    }
=======
  // async findAll() {
  async findAll(): Promise<Student[]> {
    return await this.studentRepository.find();
    //   {relations:{
    //    classroom:true
    //   }}
    // );
    // return await this.studentRepository    
    // .createQueryBuilder("student")
    // // .innerJoinAndSelect("student.classroom", "studc")
    // .getMany()
    // return await this.studentRepository.count();
    // return await this.studentRepository.countBy('groupby');
    // return await this.studentRepository.findAndCount()
  }

  async findTotalStudents() {
    return await this.studentRepository
      .createQueryBuilder('student')
      .innerJoinAndSelect('student.classroom', 'stud_classroom')    //optional
      // .leftJoinAndSelect('student.classroom', 'stud_classroom')    //optional
      .select('COUNT(student.id)', 'total_students')
      .addSelect('MAX( stud_classroom.maxstudents) AS maxStudents')  //optional
      .addSelect('student.classroom.id', 'Classroom_ID')
      .groupBy('student.classroom.id')
      .where('stud_classroom.id=student.classroom.id')
      .getRawMany();

    //     return await this.studentRepository.find({
    //       select:{
    // // "classroom_id":true
    //       },
    //       relations:{
    //         "classroom":true
    //       },
    //       where:{

    //       }

    //     }
    //     )


  }
>>>>>>> 3758e2dd493b3456c76a35f83b076a9e4b600c17

  async update(
    id: number,
    updateStudentDto: UpdateStudentDto,
  ): Promise<Student> {
    await this.studentRepository.update(id, updateStudentDto);
    const updatedStudent = await this.studentRepository.findOneBy({ id });
    if (updatedStudent) {
      return updatedStudent;
    }
    throw new HttpException('Classroom not found', HttpStatus.NOT_FOUND);
  }
<<<<<<< HEAD
=======

  remove(id: number) {
    // async remove(id: number) {
    return this.studentRepository.delete(id);
  }
>>>>>>> 3758e2dd493b3456c76a35f83b076a9e4b600c17
}
