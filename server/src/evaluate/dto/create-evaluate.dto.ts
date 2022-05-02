import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

export class CreateEvaluateDto {
  _id: string;
  name: string;
  description: string;
  create_date: Date;
  status: boolean;
  update_date: Date;
  create_by_id: ObjectId;
  user_edit: ObjectId;
  edit_by_id: ObjectId;
  earn_id:ObjectId;
  reason_reward:string;
  category_reward:string;
  date_reward:Date;
  type:string;
}

export class QueryListEvaluate {
  @ApiProperty({ required: false })
  page: number;

  @ApiProperty({ required: false })
  perPage: number;

  @ApiProperty({ required: false, type: String })
  fileds: string;

  @ApiProperty({ required: false, type: String })
  keyword: string;
}
