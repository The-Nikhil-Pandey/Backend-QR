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
  rollNo: string;

  @ApiProperty()
  regNo: string;

  @ApiProperty()
  contact: string;

  @ApiProperty()
  dob: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  img: string;
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

  @ApiProperty()
  type: string;
}

export class CreateAccountantDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
export class CreateLibrarianDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
