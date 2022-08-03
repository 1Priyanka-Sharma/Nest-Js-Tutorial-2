import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Student])],
  controllers: [StudentController],
<<<<<<< HEAD
  providers: [StudentService]
=======
  providers: [StudentService],
  exports:[StudentService]
>>>>>>> 3758e2dd493b3456c76a35f83b076a9e4b600c17
})
export class StudentModule {}
