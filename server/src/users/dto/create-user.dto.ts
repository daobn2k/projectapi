import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  username:string;
  password:string;
  name: string;
  dob: Date;
  address:string;
  email:string;
  create_date:Date;
  education:string;
  status:boolean;
  department_id:string;
  role:string;
  avatar:string;
}

export class QueryListUsers {
  @ApiProperty({ default: 1, description: 'Page number' })
  page: number;

  @ApiProperty({ default: 5, description: 'Limit number' })
  perPage: number;

  @ApiProperty({type:String})
  keyword:string;
}
