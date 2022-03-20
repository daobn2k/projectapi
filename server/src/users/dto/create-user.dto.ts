import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

export class CreateUserDto {
  username:string;
  password:string;
  name: string;
  dob: Date;
  address:string;
  email:string;
  create_date:Date;
  education_id:ObjectId;
  status:boolean;
  department_id:ObjectId;
  role_id:ObjectId;
  avatar:string;
  certificate:string;
  phone:string;
  description:string;
  sex:String;
}

export class QueryListUsers {
  @ApiProperty({ default: 1, description: 'Page number' })
  page: number;

  @ApiProperty({ default: 5, description: 'Limit number' })
  perPage: number;

  @ApiProperty({required:false,type:String})
  fileds:string;

  @ApiProperty({required:false,type:String})
  keyword:string;

}
