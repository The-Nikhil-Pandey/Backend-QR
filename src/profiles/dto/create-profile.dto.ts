import { ApiProperty } from '@nestjs/swagger';

export class CreateStudentDto {
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
  type: string;
}

export class CreateFacultyDto {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  subject: string[];
}
