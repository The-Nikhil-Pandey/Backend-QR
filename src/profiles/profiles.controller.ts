import { Controller, Get, Body, Param, Delete, Put } from '@nestjs/common';
import { FacultyService, ProfilesService } from './profiles.service';
import { UpdateFacultyDto, UpdateStudentDto } from './dto/update-profile.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Students')
@Controller('students')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  // @Post('/students/sign-up')
  // createStudent(@Body() createStudentDto: CreateStudentDto) {
  //   return this.profilesService.createStudent(createStudentDto);
  // }

  // @Post('/students/log-in')
  // logIn(@Body() logInDto: LogInDto) {
  //   return this.profilesService.logIn(logInDto);
  // }

  @Put(':_id')
  updateStudent(
    @Param('_id') _id: string,
    @Body() updateStudent: UpdateStudentDto,
  ) {
    return this.profilesService.updateStudent(_id, updateStudent);
  }

  @Get('')
  findAll() {
    return this.profilesService.findAll();
  }

  @Delete(':id')
  remove(@Param('_id') _id: string) {
    return this.profilesService.remove(_id);
  }
  @Get(':_id')
  findOne(@Param('id') _id: string) {
    return this.profilesService.findOne(_id);
  }
}

// Faculty

@ApiTags('Faculty')
@Controller('faculty')
export class FacultyController {
  constructor(private readonly facultyService: FacultyService) {}

  // @Post('/sign-up')
  // createFaculty(@Body() createFacultyDto: CreateFacultyDto) {
  //   return this.facultyService.createFaculty(createFacultyDto);
  // }

  // @Post('/log-in')
  // logInFaculty(@Body() logInfacultyDto: LogInDto) {
  //   return this.facultyService.loginFaculty(logInfacultyDto);
  // }

  @Put(':_id')
  updateFaculty(
    @Param('_id') email: string,
    @Body() updateFacultyDto: UpdateFacultyDto,
  ) {
    return this.facultyService.updateFaculty(email, updateFacultyDto);
  }

  @Delete(':_id')
  deleteFaculty(@Param('_id') _id: string) {
    return this.facultyService.deleteFaculty(_id);
  }
}
