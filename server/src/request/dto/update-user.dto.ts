import { PartialType } from '@nestjs/mapped-types';
import { CreateRequestDto } from './create-user.dto';

export class UpdateRequestDto extends PartialType(CreateRequestDto) {}
