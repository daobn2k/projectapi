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
import { ApiTags } from '@nestjs/swagger';
import { EvaluateService } from './evaluate.service';
import { CreateEvaluateDto, QueryListEvaluate } from './dto/create-evaluate.dto';
import { UpdateEvaluateDto } from './dto/update-evaluate.dto';

@ApiTags('Evaluate')
@Controller('evaluate')
export class EvaluateController {
  constructor(private readonly evaluateService: EvaluateService) {}

  @Post()
  create(@Body() CreateEvaluateDto: CreateEvaluateDto) {
    return this.evaluateService.create(CreateEvaluateDto);
  }

  @Get()
  findAll(@Query() query: QueryListEvaluate) {
    return this.evaluateService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.evaluateService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() UpdateEvaluateDto: UpdateEvaluateDto) {

    return this.evaluateService.update(id, UpdateEvaluateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.evaluateService.remove(id);
  }
}
