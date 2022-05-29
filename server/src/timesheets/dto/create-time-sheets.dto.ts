import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { User } from 'src/users/entities/user.entity';

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
  @ApiProperty({ required: false })
  page: number;

  @ApiProperty({ required: false })
  perPage: number;

  @ApiProperty({ required: false, type: String })
  fileds: string;

  @ApiProperty({ required: false, type: String })
  keyword: string;

  @ApiProperty({ required:false, type:String })
  get_user_id:string;
}
