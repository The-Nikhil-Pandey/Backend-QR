import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from './schemas/users.schema';
import { Model } from 'mongoose';
import { LogInDto } from './dto/log-in.dto';
import { error } from 'console';
import * as bcrypt from 'bcrypt';
import { LogInWithIdDto } from './dto/logInWithId.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(Users.name) private model: Model<Users>) {}

  async createUser(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    return this.model.create({
      email: createUserDto.email,
      name: createUserDto.name,
      password: hashedPassword,
    });
  }

  async getUser(logInDto: LogInDto) {
    const res = await this.model.findOne({ email: logInDto.email });

    if (res) {
      // Compare the provided password with the hashed password in the database
      const passwordMatch = await bcrypt.compare(
        logInDto.password,
        res.password,
      );
      if (passwordMatch) {
        return res;
      } else {
        throw new Error('Invalid Password');
      }
    }
    throw new Error('User not found');
  }

  async logInWithId(logInWithIdDto: LogInWithIdDto) {
    const res = await this.model.findOne({ _id: logInWithIdDto._id });
    const passwordMatch = await bcrypt.compare(
      logInWithIdDto.password,
      res.password,
    );
    if (passwordMatch) {
      return res;
    } else {
      throw new Error('Invalid Password');
    }

    throw new Error('User not found');
  }

  async updateUser(updateUSer: UpdateUserDto) {
    const res = await this.model.findOne({ email: updateUSer.email });
    if (!res) return new UnauthorizedException('Invalid Email You have Given');
    res.firstName = updateUSer.name;
    await res.save();
    return res;
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

  async remove(email: string) {
    console.log('email', email);
    const res = await this.model.findOne({
      email: email,
    });
    console.log('res', res);

    if (!res) {
      throw new UnauthorizedException('You Have Entered Invalid Email');
    }
    const del = await this.model.findOneAndDelete({
      email: email,
    });

    return `${del} has been deleted`;
  }
}
