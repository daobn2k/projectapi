import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

export class CreatePayRollDto {
  _id:string;
  name: string;
  start_date:Date;
  end_date;
  status:boolean;
  update_date:Date;
  create_by_id:ObjectId;
  user_edit:ObjectId;
  edit_by_id:ObjectId;
}

export class QueryListPayRoll {
  @ApiProperty({ default: 1, description: 'Page number' })
  page: number;

  @ApiProperty({ default: 5, description: 'Limit number' })
  perPage: number;
}
