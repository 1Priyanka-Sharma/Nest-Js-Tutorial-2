import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassroomModule } from './classroom/classroom.module';
import { StudentModule } from './student/student.module';
import { Classroom } from './classroom/entities/classroom.entity';
import { Student } from './student/entities/student.entity';

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
      "entities": [Classroom,Student],
      "synchronize": true,
      "logging": true
    }),
    ClassroomModule,
    StudentModule,
  ],
  // controllers: [AppController, TodoController],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
