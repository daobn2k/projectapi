import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { RequestService } from './request.service';
import { CreateRequestDto, QueryListRequests } from './dto/create-user.dto';
import { UpdateRequestDto } from './dto/update-user.dto';
import { ErrorModel } from 'src/exceptions/error.model';
import {
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiServiceUnavailableResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
@ApiTags('Request')
@Controller('request')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}
  @ApiOkResponse({
    description: 'create successfully',
  })
  @ApiBadRequestResponse({
    description: 'Something error in business',
    type: ErrorModel,
  })
  @ApiServiceUnavailableResponse({
    description: 'Service Unavailable',
    type: ErrorModel,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server Error',
    type: ErrorModel,
  })
  @ApiNotFoundResponse({
    description: 'Not found',
    type: ErrorModel,
  })
  @Post()
  @HttpCode(HttpStatus.OK)
  create(@Body() create: CreateRequestDto) {
    return this.requestService.create(create);
  }

  @Get()
  findAll(@Query() query: QueryListRequests) {
    return this.requestService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.requestService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() update: UpdateRequestDto) {
    return this.requestService.update(id, update);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requestService.remove(id);
  }

  @Post('/search')
  search(@Body() body){
    return this.requestService.search(body)
  }
}
