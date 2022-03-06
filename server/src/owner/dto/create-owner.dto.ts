import { ApiProperty } from '@nestjs/swagger';

export class CreateOwnerDto {
  name: string;
  age: number;
  address: string;
}

export class QueryListOwner {
  @ApiProperty({ default: 1, description: 'Page number' })
  page: number;

  @ApiProperty({ default: 5, description: 'Limit number' })
  perPage: number;
}
