import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateClassroomDto } from './dto/create-classroom.dto';
import { UpdateClassroomDto } from './dto/update-classroom.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Classroom } from './entities/classroom.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClassroomService {
  // Inject Classroom rep
  constructor(
    @InjectRepository(Classroom)
    private readonly classroomRepository: Repository<Classroom>,
  ) {}

  async create(createClassroomDto: CreateClassroomDto): Promise<Classroom> {
    const newClassroom = await this.classroomRepository.create(
      createClassroomDto,
    );
    await this.classroomRepository.save(newClassroom);
    return newClassroom;
  }

  findAll(): Promise<Classroom[]> {
    return this.classroomRepository.find();
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
}
