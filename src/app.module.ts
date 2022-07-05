import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { TodoModuleModule } from './todo/todo.module';
// import { TodoController } from './todo/todo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';

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
      "entities": [User],
      "synchronize": true
    }),
    UserModule,
  ],
  // controllers: [AppController, TodoController],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
