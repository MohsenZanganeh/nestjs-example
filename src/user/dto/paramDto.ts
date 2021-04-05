import { ApiProperty } from '@nestjs/swagger';

export class paramDto {
  @ApiProperty({ description: 'the id of User' })
  id: string;
}
