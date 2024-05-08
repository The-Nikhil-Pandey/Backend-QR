import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LogInDto } from './dto/log-in.dto';
import { LogInWithIdDto } from './dto/logInWithId.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/sign-up')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
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
  findAll() {
    return this.usersService.findAll();
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
