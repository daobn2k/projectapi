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
import { TimeSheetsService } from './timesheets.service';
import { CreateTimeSheetsDto, QueryListTimeSheets } from './dto/create-time-sheets.dto';
import { UpdateTimeSheetsDto } from './dto/update-time-sheets.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('TimeSheet')
@Controller('timesheets')
export class TimeSheetsController {
  constructor(private readonly timeSheetsService: TimeSheetsService) {}

  @Post()
  create(@Body() create: CreateTimeSheetsDto) {
    return this.timeSheetsService.create(create);
  }

  @Get()
  findAll(@Query() query: QueryListTimeSheets) {
    return this.timeSheetsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.timeSheetsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() update: UpdateTimeSheetsDto) {

    return this.timeSheetsService.update(id, update);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.timeSheetsService.remove(id);
  }
  @Post('/search')
  search(@Body() body){
    return this.timeSheetsService.search(body)
  }
}
