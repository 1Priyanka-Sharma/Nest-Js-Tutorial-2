import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { CreateClassroomDto } from './dto/create-classroom.dto';
import { UpdateClassroomDto } from './dto/update-classroom.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Classroom } from './entities/classroom.entity';
import { Repository } from 'typeorm';
import { StudentService } from 'src/student/student.service';
// import { Student } from 'src/student/entities/student.entity';
// import { StudentModule } from 'src/student/student.module';

@Injectable()
export class ClassroomService {
  @Inject()
  studentService: StudentService;

  // Inject Classroom repo
  constructor(
    @InjectRepository(Classroom)
    private readonly classroomRepository: Repository<Classroom>,
  ) {}

  async create(createClassroomDto: CreateClassroomDto): Promise<Classroom> {
    let classroomName = createClassroomDto.name;
    const existedClassroom = await this.classroomRepository.findOne({
      where: { name: classroomName },
    });

    if (!existedClassroom) {
      const newClassroom = await this.classroomRepository.create(
        createClassroomDto,
      );
      await this.classroomRepository.save(newClassroom);
      return newClassroom;
    }
    throw new HttpException(
      'Classroom already exists of the same name',
      HttpStatus.CONFLICT,
    );
  }

  findAll(): Promise<Classroom[]> {
    return this.classroomRepository.find();
  }

  async findTotalStudents(): Promise<Classroom[]> {
    let eCID: number;
    let totalStudents = [];
    const totalStudentsQuery = await this.studentService.findTotalStudents();

    for (const element of totalStudentsQuery) {
      eCID = element.Classroom_ID;
      let getClassroomName = await this.classroomRepository
        .createQueryBuilder('classroom')
        .select('classroom.name', 'ClassroomName')
        .addSelect('classroom.id', 'ClassroomID') //optional(just in case)
        .where('classroom.id = :eCID', { eCID: eCID })
        .getRawMany();

      element.className = getClassroomName[0].ClassroomName;
      totalStudents.push(element);
      //       getClassroomName[0].students = element.students;
      //       totalStudents.push(...getClassroomName);
    }
    return totalStudents;
  }

  async update(
    id: number,
    updateClassroomDto: UpdateClassroomDto,
  ): Promise<Classroom> {
    await this.classroomRepository.update(id, updateClassroomDto);
    const updatedClassroom = await this.classroomRepository.findOneBy({ id });
    if (updatedClassroom) {
      return updatedClassroom;
    }
    throw new HttpException('Classroom not found', HttpStatus.NOT_FOUND);
  }

  remove(id: number) {
    return this.classroomRepository.delete(id);
  }
}
