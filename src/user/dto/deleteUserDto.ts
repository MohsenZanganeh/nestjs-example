import { ApiProperty } from '@nestjs/swagger';

export class DeleteUserDto {
  @ApiProperty({ description: 'the id of User' })
  id: string;

  @ApiProperty({ example: 'mohsen', description: 'the name of User' })
  name: string;

  @ApiProperty({ example: 19, description: 'the age of User' })
  age: number;
}
