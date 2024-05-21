import { PartialType } from '@nestjs/swagger';
import { CreateFacultyDto, CreateStudentDto } from './create-profile.dto';

export class UpdateStudentDto extends PartialType(CreateStudentDto) {}

export class UpdateFacultyDto extends PartialType(CreateFacultyDto) {}
