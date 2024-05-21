import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LogInDto } from './dto/log-in.dto';
import { LogInWithIdDto } from './dto/logInWithId.dto';
import { ApiTags } from '@nestjs/swagger';
import { FacultyService, ProfilesService } from 'src/profiles/profiles.service';
import {
  CreateFacultyDto,
  CreateStudentDto,
} from 'src/profiles/dto/create-profile.dto';
import { UserType } from './users.enum';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly studentService: ProfilesService,
    private readonly facultyService: FacultyService,
  ) {}

  @Post('/sign-up')
  async create(
    @Body() createStudentDto: CreateStudentDto,
    createFacultyDto: CreateFacultyDto,
  ) {
    const typeStudent = createStudentDto.type;
    if (!UserType.hasOwnProperty(createStudentDto.type)) {
      return new UnauthorizedException('TYPE is Wrong');
    }
    if (typeStudent == 'student') {
      return this.studentService.createStudent(createStudentDto);
    }
    if (typeStudent == 'faculty') {
      return this.facultyService.createFaculty(createFacultyDto);
    }

    // return this.usersService.createUser(createUserDto);
  }

  @Post('/sign-in')
  getUser(@Body() logInDto: LogInDto) {
    return this.usersService.getUser(logInDto);
  }

  @Post('/signin-id')
  getUserById(@Body() logInWithIdDto: LogInWithIdDto) {
    return this.usersService.logInWithId(logInWithIdDto);
  }

  @Put()
  updateUser(@Body() updateUser: UpdateUserDto) {
    return this.usersService.updateUser(updateUser);
  }

  @Get()
  findAll(@Query('type') type: string) {
    return this.usersService.findAll(type);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':email')
  remove(@Param('email') email: string) {
    return this.usersService.remove(email);
  }
}
