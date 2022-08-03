import { Module } from '@nestjs/common';
import { ClassTeacherService } from './class-teacher.service';
import { ClassTeacherController } from './class-teacher.controller';
import { ClassTeacher } from './entities/class-teacher.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([ClassTeacher])],

  controllers: [ClassTeacherController],
  providers: [ClassTeacherService]
})
export class ClassTeacherModule {}
