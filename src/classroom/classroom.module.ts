import { Module } from '@nestjs/common';
import { ClassroomService } from './classroom.service';
import { ClassroomController } from './classroom.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Classroom } from './entities/classroom.entity';
<<<<<<< HEAD

@Module({ 
  imports:[TypeOrmModule.forFeature([Classroom])],
  controllers: [ClassroomController],
  providers: [ClassroomService]
=======
import { StudentModule } from 'src/student/student.module';

@Module({ 
  imports:[TypeOrmModule.forFeature([Classroom]),StudentModule],
  controllers: [ClassroomController],
  providers: [ClassroomService],
>>>>>>> 3758e2dd493b3456c76a35f83b076a9e4b600c17
})
export class ClassroomModule {}
