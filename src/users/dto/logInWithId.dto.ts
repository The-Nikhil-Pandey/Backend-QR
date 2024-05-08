import { ApiProperty } from '@nestjs/swagger';

export class LogInWithIdDto {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  password: string;
}
