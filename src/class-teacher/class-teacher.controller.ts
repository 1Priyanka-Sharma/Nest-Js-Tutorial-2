import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClassTeacherService } from './class-teacher.service';
import { CreateClassTeacherDto } from './dto/create-class-teacher.dto';
import { UpdateClassTeacherDto } from './dto/update-class-teacher.dto';

@Controller('class-teacher')
export class ClassTeacherController {
  constructor(private readonly classTeacherService: ClassTeacherService) {}

  @Post()
  create(@Body() createClassTeacherDto: CreateClassTeacherDto) {
    return this.classTeacherService.create(createClassTeacherDto);
  }

  @Get()
  findAll() {
    return this.classTeacherService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classTeacherService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClassTeacherDto: UpdateClassTeacherDto) {
    return this.classTeacherService.update(+id, updateClassTeacherDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classTeacherService.remove(+id);
  }
}
