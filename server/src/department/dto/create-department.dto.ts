import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

export class CreateDepartmentDto {
  _id: string;
  name: string;
  description: string;
  create_date: Date;
  status: boolean;
  update_date: Date;
  admin_user_id: ObjectId;
  create_by_id: ObjectId;
  user_edit: ObjectId;
  edit_by_id: ObjectId;
}

export class QueryListDepartment {
  @ApiProperty({ required: false })
  page: number;

  @ApiProperty({ required: false })
  perPage: number;

  @ApiProperty({ required: false, type: String })
  fileds: string;

  @ApiProperty({ required: false, type: String })
  keyword: string;
}
