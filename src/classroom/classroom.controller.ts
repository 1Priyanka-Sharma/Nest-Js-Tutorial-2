import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
<<<<<<< HEAD
  Delete,
=======
  Delete
>>>>>>> 3758e2dd493b3456c76a35f83b076a9e4b600c17
} from '@nestjs/common';
import { ClassroomService } from './classroom.service';
import { CreateClassroomDto } from './dto/create-classroom.dto';
import { UpdateClassroomDto } from './dto/update-classroom.dto';

@Controller('classroom')
export class ClassroomController {
  constructor(private readonly classroomService: ClassroomService) {}

  @Post()
  create(@Body() createClassroomDto: CreateClassroomDto) {
    return this.classroomService.create(createClassroomDto);
  }

  @Get()
  findAll() {
    return this.classroomService.findAll();
  }

<<<<<<< HEAD
=======
  @Get('total_students')
  findTotalStudents() {
    return this.classroomService.findTotalStudents();
  }

>>>>>>> 3758e2dd493b3456c76a35f83b076a9e4b600c17
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateClassroomDto: UpdateClassroomDto,
  ) {
    return this.classroomService.update(+id, updateClassroomDto);
  }
<<<<<<< HEAD
}
=======

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classroomService.remove(+id);
  }
}

>>>>>>> 3758e2dd493b3456c76a35f83b076a9e4b600c17
