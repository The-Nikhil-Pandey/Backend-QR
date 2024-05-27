import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateStudentDto } from 'src/profiles/dto/create-profile.dto';

export class CreateUserDto extends PartialType(CreateStudentDto) {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  course: string;

  @ApiProperty()
  branch: string;

  @ApiProperty()
  rollNo: number;

  @ApiProperty()
  regNo: number;

  @ApiProperty()
  contact: number;

  @ApiProperty()
  dob: string;

  @ApiProperty()
  subject: string[];

  @ApiProperty()
  type: string;
}
