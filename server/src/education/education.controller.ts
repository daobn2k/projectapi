import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { EducationService } from './education.service';
import { CreateEducationDto, QueryListEducation } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Education')
@Controller('education')
export class EducationController {
  constructor(private readonly educationService: EducationService) {}

  @Post()
  create(@Body() CreateEducationDto: CreateEducationDto) {
    return this.educationService.create(CreateEducationDto);
  }

  @Get()
  findAll(@Query() query: QueryListEducation) {
    return this.educationService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.educationService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() UpdateEducationDto: UpdateEducationDto) {

    return this.educationService.update(id, UpdateEducationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.educationService.remove(id);
  }
  @Post('/search')
  search(@Body() body){
    return this.educationService.search(body)
  }
}
