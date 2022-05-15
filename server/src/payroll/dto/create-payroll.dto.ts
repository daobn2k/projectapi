import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

export class CreatePayRollDto {
  total_working_time:string;
  total_money:number;
  salary:number;
  salary_bonus:number;
  user_id:ObjectId;
  in_month:string;
  create_by_id:ObjectId;
  edit_by_id:ObjectId;
}

export class QueryListPayRoll {
  page: number;

  @ApiProperty({ required: false })
  perPage: number;

  @ApiProperty({ required: false, type: String })
  fileds: string;

  @ApiProperty({ required: false, type: String })
  keyword: string;
}
