import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

export class CreateDepartmentDto {
  _id:string;
  name: string;
  create_date:Date;
  status:boolean;
  update_date:Date;
  create_by_id:ObjectId;
  user_edit:ObjectId;
  edit_by_id:ObjectId;
}

export class QueryListDepartment {
  @ApiProperty({ default: 1, description: 'Page number' })
  page: number;

  @ApiProperty({ default: 5, description: 'Limit number' })
  perPage: number;
}
