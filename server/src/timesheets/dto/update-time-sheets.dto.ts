import { PartialType } from '@nestjs/mapped-types';
import { CreateTimeSheetsDto } from './create-time-sheets.dto';

export class UpdateTimeSheetsDto extends PartialType(CreateTimeSheetsDto) {}
