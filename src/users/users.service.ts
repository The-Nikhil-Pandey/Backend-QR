import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from './schemas/users.schema';
import { Model } from 'mongoose';
import { LogInDto } from './dto/log-in.dto';
import { LogInWithIdDto } from './dto/logInWithId.dto';
import { UserType } from './users.enum';

@Injectable()
export class UsersService {
  constructor(@InjectModel(Users.name) private model: Model<Users>) {}

  async createUser(createUserDto: CreateUserDto) {
    const res = await this.model.findOne({ email: createUserDto.email });
    if (!UserType.hasOwnProperty(createUserDto.type)) {
      return new UnauthorizedException('TYPE is Wrong');
    }
    if (res) {
      return new UnauthorizedException('This Email is Already Registered');
    }

    const hashedPassword = createUserDto.password;
    return this.model.create({
      email: createUserDto.email,
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      password: hashedPassword,
      type: createUserDto.type,
    });
  }

  async getUser(logInDto: LogInDto) {
    const res = await this.model.findOne({ email: logInDto.email });

    if (res) {
      // Compare the provided password with the hashed password in the database
      const passwordMatch = true;
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
    const passwordMatch = true;
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
    res.firstName = updateUSer.firstName;
    res.lastName = updateUSer.lastName;
    await res.save();
    return res;
  }

  async findAll(type: string) {
    return await this.model.find({ type: type });
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  async remove(email: string) {
    const res = await this.model.findOne({
      email: email,
    });

    if (!res) {
      throw new UnauthorizedException('You Have Entered Invalid Email');
    }
    const del = await this.model.findOneAndDelete({
      email: email,
    });

    return `${del} has been deleted`;
  }
}
