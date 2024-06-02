import { Injectable, UnauthorizedException } from '@nestjs/common';
import {
  CreateAccountantDto,
  CreateFacultyDto,
  CreateLibrarianDto,
  CreateStudentDto,
} from './dto/create-profile.dto';
import { UpdateFacultyDto, UpdateStudentDto } from './dto/update-profile.dto';
import { Students } from './schemas/students.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { LogInDto } from './dto/login.dto';
import { Faculty } from './schemas/faculty.schema';
import * as bcrypt from 'bcrypt';
import { Accountant } from './schemas/accountant.schema';
import { Librarian } from './schemas/librarian.schema';

@Injectable()
export class ProfilesService {
  constructor(@InjectModel(Students.name) private model: Model<Students>) {}

  async createStudent(createStudentDto: CreateStudentDto) {
    const res = await this.model.findOne({ email: createStudentDto.email });
    console.log(res);

    if (res) {
      return new UnauthorizedException('Usery Already Registered');
    }

    return this.model.create(createStudentDto);
  }

  async logIn(logInDto: LogInDto) {
    const res = await this.model.findOne({ _id: logInDto._id });
    if (res) {
      const passwordMatch = await bcrypt.compare(
        logInDto.password,
        res.password,
      );
      if (passwordMatch) {
        return res;
      }
      throw new Error('Invalid Password');
    }

    return Error('User Not Found');
  }

  async updateStudent(_id: string, updateStudent: UpdateStudentDto) {
    const res = this.model.findOne({ _id: _id });
    const checkEmail = this.model.findOne({ email: updateStudent.email });

    if (!res) return new UnauthorizedException('User Not Exists');
    if ((await checkEmail).email == updateStudent.email) {
      return new UnauthorizedException('You are giving same email');
    }
    if (checkEmail) {
      return new UnauthorizedException(
        'The email you want to update is already taken',
      );
    }

    const updatedData = await this.model.findOneAndUpdate(
      { _id: _id },
      updateStudent,
    );
    await updatedData.save();
    return updatedData;
  }

  async remove(_id: string) {
    const res = await this.model.findOne({ _id: _id });
    if (!res) return new UnauthorizedException("This Email Doesn't Exists");

    await this.model.findOneAndDelete({ _id: _id });
    return `${res} has been Deleted`;
  }

  findAll() {
    return this.model.find();
  }

  findOne(_id: string) {
    return this.model.findOne({ _id: _id });
  }
}

export class FacultyService {
  constructor(@InjectModel(Faculty.name) private model: Model<Faculty>) {}

  async createFaculty(createFacultyDto: CreateFacultyDto) {
    // const res = await this.model.findOne({ email: createFacultyDto.email });
    // if (res) return new UnauthorizedException('Email is Already Registered');

    return this.model.create(createFacultyDto);
  }

  async loginFaculty(loginFacultyDto: LogInDto) {
    return this.model.findOne({ _id: loginFacultyDto._id });
  }

  async allFaculty() {
    return this.model.find();
  }

  async updateFaculty(_id: string, updateFacultyDto: UpdateFacultyDto) {
    const res = this.model.findOne({ _id: _id });
    if (!res) return new UnauthorizedException('User Not Found');

    const updatedData = await this.model.findOneAndUpdate(
      { _id: _id },
      updateFacultyDto,
    );

    return updatedData.save();
  }

  async deleteFaculty(_id: string) {
    const res = await this.model.findOne({ _id: _id });
    if (!res) {
      return new UnauthorizedException('User do not exists');
    }

    await this.model.findOneAndDelete({ _id: _id });

    return `${res} has been deleted`;
  }
}

export class AccountantService {
  constructor(@InjectModel(Accountant.name) private model: Model<Accountant>) {}
  async create(createAccountantDto: CreateAccountantDto) {
    return this.model.create(createAccountantDto);
  }
  async getall() {
    return this.model.find();
  }
}

export class LibrarianService {
  constructor(@InjectModel(Librarian.name) private model: Model<Librarian>) {}
  async create(createLibrarianDto: CreateLibrarianDto) {
    return this.model.create(createLibrarianDto);
  }
  async getall() {
    return this.model.find();
  }
}
