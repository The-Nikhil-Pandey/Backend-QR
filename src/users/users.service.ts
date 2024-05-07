import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from './schemas/users.schema';
import { Model } from 'mongoose';
import { LogInDto } from './dto/log-in.dto';
import { error } from 'console';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Injectable()
export class UsersService {
  constructor(@InjectModel(Users.name) private model: Model<Users>) {}

  async createUser(createUserDto: CreateUserDto) {
    return this.model.create({
      email: createUserDto.email,
      name: createUserDto.name,
      password: createUserDto.password,
    });
  }

  async getUser(logInDto: LogInDto) {
    const res = await this.model.findOne({ email: logInDto.password });

    if (res) return res;
    throw error('Invalid Password');
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
