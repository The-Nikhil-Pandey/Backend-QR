import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from './schemas/users.schema';
import { Model, Types } from 'mongoose';
import { LogInDto } from './dto/log-in.dto';
import { LogInWithIdDto } from './dto/logInWithId.dto';
import { UserType } from './users.enum';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Students } from 'src/profiles/schemas/students.schema';
import { Faculty } from 'src/profiles/schemas/faculty.schema';

@Injectable()
export class UsersService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(Users.name) private model: Model<Users>,
    @InjectModel(Students.name) private studentModel: Model<Students>,
    @InjectModel(Faculty.name) private facultyModel: Model<Faculty>,
  ) { }

  async createUser(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const res = await this.model.findOne({ email: createUserDto.email });
    if (!UserType.hasOwnProperty(createUserDto.type)) {
      return new UnauthorizedException('TYPE is Wrong');
    }
    if (res) {
      return new UnauthorizedException('This Email is Already Registered');
    }

    const data = await this.model.create({
      email: createUserDto.email,
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      password: hashedPassword,
      type: createUserDto.type,
    });

    const jwtRes = await this.jwtService.signAsync({
      walletAddress: data.email,
      sub: data._id
    })
    return {
      ...data,
      accessToken: jwtRes
    }

  }

  async signIn(logInDto: LogInDto) {
    var res:any = await this.model.findOne({ email: logInDto.email });

    if (!res) {
      throw new Error('User not found');
    }

    const passwordMatch = await bcrypt.compare(
      logInDto.password,
      res.password,
    );

    if (!passwordMatch) {
      throw new UnauthorizedException({
        message: "Invalid email or password"
      });
    }
    if (res.type == UserType.student) {
      const student = await this.studentModel.findById(res._id, {}, { lean: true })
      res ={
        ...res,
        ...student
      }
    }else if (res.type == UserType.faculty) {
      const faculty = await this.facultyModel.findById(res._id, {}, { lean: true })
      res ={
        ...res,
        ...faculty
      }
    }

    const jwtRes = await this.jwtService.signAsync({
      walletAddress: res.email,
      sub: res._id
    })

    return {
      ...res,
      accessToken: jwtRes
    }
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
