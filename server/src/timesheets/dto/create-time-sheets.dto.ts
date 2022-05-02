import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

export class CreateTimeSheetsDto {
  _id:string;
  user_id: ObjectId;
  start_date_time:Date;
  end_date_time:Date;
  create_date:Date;
  status:boolean;
  update_date:Date;
  create_by_id:ObjectId;
  user_edit:ObjectId;
  edit_by_id:ObjectId;
}

export class QueryListTimeSheets {
  @ApiProperty({ default: 1, description: 'Page number' })
  page: number;

  @ApiProperty({ default: 5, description: 'Limit number' })
  perPage: number;
}
