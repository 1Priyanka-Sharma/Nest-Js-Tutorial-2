import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentService {
 
  // Inject Student rep
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const newStudent = await this.studentRepository.create(createStudentDto);
    await this.studentRepository.save(newStudent);
    return newStudent;
  }

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
}
