import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateStudentDto } from 'src/profiles/dto/create-profile.dto';

export class CreateUserDto {
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
  rollNo: string;

  @ApiProperty()
  regNo: string;

  @ApiProperty()
  contact: string;

  @ApiProperty()
  dob: string;

  @ApiProperty()
  subject: string[];

  @ApiProperty()
  type: string;

  @ApiProperty()
  img: string;

  @ApiProperty({ type: Object })
  personalInfo: {};
}
