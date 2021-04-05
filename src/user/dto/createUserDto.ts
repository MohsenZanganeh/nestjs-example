import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';
export class CreateUserDto {
  @ApiProperty({ example: 'mohsen', description: 'the name of User' })
  @IsString()
  name: string;

  @ApiProperty({ example: 19, description: 'the age of User' })
  @IsNumber()
  age: number;
}
