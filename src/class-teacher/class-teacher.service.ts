import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateClassTeacherDto } from './dto/create-class-teacher.dto';
import { UpdateClassTeacherDto } from './dto/update-class-teacher.dto';
import { ClassTeacher } from './entities/class-teacher.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class ClassTeacherService {
  constructor(
    @InjectRepository(ClassTeacher)
    private readonly classTeacherRepository: Repository<ClassTeacher>) { }

  async create(createClassTeacherDto: CreateClassTeacherDto): Promise<ClassTeacher> {

    const newClassTeacher = await this.classTeacherRepository.create(
      createClassTeacherDto,
    );
    // let classroom = newClassTeacher.classroomId;
    // const existedClassroom = await this.classTeacherRepository.findBy({classroomId: classroom})

    try {
      await this.classTeacherRepository.save(newClassTeacher);
      return newClassTeacher;
    }
    catch (err) {
      throw new HttpException(
        `Class Teacher of the given class id can't be created.`,
        HttpStatus.CONFLICT,
      );
    }
  }


  async findAll() {
    return await this.classTeacherRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} classTeacher`;
  }

  update(id: number, updateClassTeacherDto: UpdateClassTeacherDto) {
    return `This action updates a #${id} classTeacher`;
  }

  remove(id: number) {
    return `This action removes a #${id} classTeacher`;
  }
}
