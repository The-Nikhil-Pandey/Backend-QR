import { Injectable } from '@nestjs/common';
import { CreateFeeDto } from './dto/create-fee.dto';
import { UpdateFeeDto } from './dto/update-fee.dto';
import { AuthInfo } from 'src/auth/auth.guard';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Fees } from './schemas/fees.schema';

@Injectable()
export class FeesService {

  constructor(@InjectModel(Fees.name) private model: Model<Fees>) { }

  async create(dto: CreateFeeDto, auth: AuthInfo) {
    return await this.model.create({
      amount: dto.amount,
      createdBy: new Types.ObjectId(auth.sub),
      received: false,
      student: new Types.ObjectId(dto.studentId),
      year: dto.year
    })
  }

  async findAll() {
    return await this.model.find()
  }

  async findOne(id: string) {
    return await this.model.findById(new Types.ObjectId(id))
  }
  async findByStudentId(id: string) {
    const data = await this.model.find({ student: new Types.ObjectId(id) })
    const count = await this.model.countDocuments({ student: new Types.ObjectId(id) })
    const totalSubmitted = data.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.amount
    }, 0);

    return {
      data,
      count,
      totalSubmitted
    }
  }

  async update(id: string, updateFeeDto: UpdateFeeDto) {
    return await this.model.findByIdAndUpdate(new Types.ObjectId(id), updateFeeDto)
  }

  remove(id: number) {
    return `This action removes a #${id} fee`;
  }
}
