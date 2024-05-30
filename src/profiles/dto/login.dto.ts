import { ApiProperty } from '@nestjs/swagger';

export class LogInDto {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  password: string;
}
