import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  name: string;
  age: number;
  s;
}

export class QueryListUsers {
  @ApiProperty({ default: 1, description: 'Page number' })
  page: number;

  @ApiProperty({ default: 5, description: 'Limit number' })
  perPage: number;
}
