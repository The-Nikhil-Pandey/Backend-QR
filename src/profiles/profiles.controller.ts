import {
  Controller,
  Get,
  Body,
  Param,
  Delete,
  Put,
  Post,
} from '@nestjs/common';
import {
  AccountantService,
  FacultyService,
  LibrarianService,
  ProfilesService,
} from './profiles.service';
import { UpdateFacultyDto, UpdateStudentDto } from './dto/update-profile.dto';
import { ApiTags } from '@nestjs/swagger';
import { LogInDto } from './dto/login.dto';

@ApiTags('Students')
@Controller('students')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  // @Post('/students/sign-up')
  // createStudent(@Body() createStudentDto: CreateStudentDto) {
  //   return this.profilesService.createStudent(createStudentDto);
  // }

  @Post('/log-in')
  logIn(@Body() logInDto: LogInDto) {
    return this.profilesService.logIn(logInDto);
  }

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

  @Get('/all')
  allFaculty() {
    return this.facultyService.allFaculty();
  }

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

@ApiTags('Accountant')
@Controller('accountant')
export class AccountController {
  constructor(private readonly AccountantService: AccountantService) {}
  @Get('all')
  allAccountant() {
    return this.AccountantService.getall();
  }
}

@ApiTags('Librarian')
@Controller('librarian')
export class LibrarianController {
  constructor(private readonly LibrarianService: LibrarianService) {}
  @Get('all')
  allAccountant() {
    return this.LibrarianService.getall();
  }
}
