import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

export class CreateRequestDto {
  name:string;

  description:string;

  from_date:Date

  end_date:Date
  
  create_date:Date;

  user_id:ObjectId;

  status:string;

  create_by_id:ObjectId;
  
  edit_by_id: ObjectId;
}

export class QueryListRequests {
  @ApiProperty({ default: 1, description: 'Page number' })
  page: number;

  @ApiProperty({ default: 5, description: 'Limit number' })
  perPage: number;

  @ApiProperty({required:false,type:String})
  fileds:string;

  @ApiProperty({required:false,type:String})
  keyword:string;

}
