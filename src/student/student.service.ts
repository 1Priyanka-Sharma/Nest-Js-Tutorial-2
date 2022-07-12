import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>, // @InjectRepository(Classroom) // private readonly classroomRepository: Repository<Classroom>
  ) {}

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
    await this.studentRepository.save(newStudent);
    return newStudent;
  }

  findAll(): Promise<Student[]> {
    return this.studentRepository.find();
  }

  async findTotalStudents() {
    return await this.studentRepository
      .createQueryBuilder('student')
      .leftJoinAndSelect('student.classroom', 'maxstud')    //optional
      .select('COUNT(student.id) AS Students')
      .addSelect('MAX( maxstud.maxstudents) AS maxStudents')  //optional
      .addSelect('student.classroom.id', 'Classroom_ID')
      .groupBy('student.classroom.id')
      .getRawMany();
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

  remove(id: number) {
    return this.studentRepository.delete(id);
  }
}
