import { PartialType } from '@nestjs/mapped-types';
import { CreatePayRollDto } from './create-payroll.dto';

export class UpdatePayRollDto extends PartialType(CreatePayRollDto) {}
