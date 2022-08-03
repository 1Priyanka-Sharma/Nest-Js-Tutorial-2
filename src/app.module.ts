import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassroomModule } from './classroom/classroom.module';
import { StudentModule } from './student/student.module';
import { Classroom } from './classroom/entities/classroom.entity';
import { Student } from './student/entities/student.entity';
// import { ClassTeacherController } from './class-teacher/class-teacher.controller';
import { ClassTeacherModule } from './class-teacher/class-teacher.module';
import { ClassTeacher } from './class-teacher/entities/class-teacher.entity';

@Module({
  // imports: [TodoModuleModule],
  imports: [
    TypeOrmModule.forRoot({
      "type": "postgres",
      "host": "localhost",
      "port": 5432,
      "username": "postgres",
      "password": "postgres",
      "database": "mydb",
      "entities": [Classroom, Student, ClassTeacher],
      "synchronize": true,
      "logging": true
    }),
    ClassroomModule,
    StudentModule,
    ClassTeacherModule,
  ],
  // controllers: [ClassTeacherController],
  // controllers: [AppController, TodoController],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule { }
