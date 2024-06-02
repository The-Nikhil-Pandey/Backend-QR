import {
  Controller,
  Get,
  Post,
  Body,
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
import { UserType } from './users.enum';
import * as bcrypt from 'bcrypt';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly studentService: ProfilesService,
    private readonly facultyService: FacultyService,
  ) {}

  @Post('/sign-up')
  async create(@Body() createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const typeStudent = createUserDto.type;
    if (!UserType.hasOwnProperty(createUserDto.type)) {
      return new UnauthorizedException('TYPE is Wrong');
    }
    if (typeStudent == 'student') {
      return this.studentService.createStudent(createUserDto);
    }
    if (typeStudent == 'faculty') {
      return this.facultyService.createFaculty({
        firstName: createUserDto.firstName,

        lastName: createUserDto.lastName,

        email: createUserDto.email,

        password: createUserDto.password,

        subject: createUserDto.subject,

        type: createUserDto.type,
      });
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

  @Delete(':email')
  remove(@Param('email') email: string) {
    return this.usersService.remove(email);
  }
}
