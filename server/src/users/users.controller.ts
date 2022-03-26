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
import { UsersService } from './users.service';
import {
  changePassDto,
  CreateUserDto,
  QueryListUsers,
} from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ErrorModel } from 'src/exceptions/error.model';
import {
  ApiOperation,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
  ApiServiceUnavailableResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
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
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(@Query() query: QueryListUsers) {
    return this.usersService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Post('/search')
  search(@Body() body) {
    return this.usersService.search(body);
  }
  @Post('/login')
  login(@Body() body) {
    return this.usersService.login(body);
  }
  @Post('/logout')
  logout(@Body() id: string) {
    return this.usersService.logout(id);
  }
  @Post('/change')
  changePass(@Body() body: changePassDto) {
    return this.usersService.changePass(body);
  }
}
