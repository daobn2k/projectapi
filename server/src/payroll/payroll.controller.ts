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
import { PayRollService } from './payroll.service';
import { CreatePayRollDto, QueryListPayRoll } from './dto/create-payroll.dto';
import { UpdatePayRollDto } from './dto/update-payroll.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('PayRoll')
@Controller('payroll')
export class PayRollController {
  constructor(private readonly timeSheetsService: PayRollService) {}

  @Post()
  create(@Body() create: CreatePayRollDto) {
    return this.timeSheetsService.create(create);
  }

  @Get()
  findAll(@Query() query: QueryListPayRoll) {
    return this.timeSheetsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.timeSheetsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() update: UpdatePayRollDto) {

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
