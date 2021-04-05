import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ example: 'mohsen', description: 'the name of User' })
  name: string;

  @ApiProperty({ example: 19, description: 'the age of User' })
  age: number;
}
