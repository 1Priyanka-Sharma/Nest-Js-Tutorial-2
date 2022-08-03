import { Module } from '@nestjs/common';
<<<<<<< HEAD
import { AppController } from './app.controller';
import { AppService } from './app.service';
=======
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
>>>>>>> 3758e2dd493b3456c76a35f83b076a9e4b600c17
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassroomModule } from './classroom/classroom.module';
import { StudentModule } from './student/student.module';
import { Classroom } from './classroom/entities/classroom.entity';
import { Student } from './student/entities/student.entity';
<<<<<<< HEAD
=======
// import { ClassTeacherController } from './class-teacher/class-teacher.controller';
import { ClassTeacherModule } from './class-teacher/class-teacher.module';
import { ClassTeacher } from './class-teacher/entities/class-teacher.entity';
>>>>>>> 3758e2dd493b3456c76a35f83b076a9e4b600c17

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
<<<<<<< HEAD
      "entities": [Classroom,Student],
      "synchronize": true
    }),
    ClassroomModule,
    StudentModule,
  ],
  // controllers: [AppController, TodoController],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
=======
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
>>>>>>> 3758e2dd493b3456c76a35f83b076a9e4b600c17
