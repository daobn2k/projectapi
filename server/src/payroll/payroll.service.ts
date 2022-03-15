import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Query } from 'mongoose';
import {
  CreatePayRollDto,
  QueryListPayRoll,
} from './dto/create-payroll.dto';
import { UpdatePayRollDto } from './dto/update-payroll.dto';
import { PayRoll } from './entities/payroll.entity';

@Injectable()
export class PayRollService {
  constructor(
    @InjectModel(PayRoll.name) private PayRollModule: Model<PayRoll>,
  ) {}

  create(createPayRollDto: CreatePayRollDto) {
    const newDepartment = new this.PayRollModule(createPayRollDto);
    newDepartment.save();
    return 'success';
  }

  async findAll(query: QueryListPayRoll) {
    const { page, perPage } = query;

    const skip: number = (page - 1) * perPage;

    const result = await this.PayRollModule.find()
      .limit(+perPage)
      .skip(skip)
      .populate('create_by_id')
      .populate('edit_by_id')
      .exec();

    const totalRecord = await this.PayRollModule.find().count().exec();
    return {
      message: 'SUCCESS',
      data: result,
      total: totalRecord,
    };
  }

  async findOne(id: string) {
    const result = await this.PayRollModule.findById(id)
      .populate('create_by_id')
      .populate('edit_by_id')
      .exec();

    return {
      message: 'SUCCESS',
      data: result,
    };
  }

  async update(id: string, updatePayRollDto: UpdatePayRollDto) {
    const result = await this.PayRollModule.findByIdAndUpdate(
      id,
      updatePayRollDto,
      {
        new: true,
      },
    );

    return {
      message: 'SUCCESS',
      data: result,
    };
  }

  async remove(id: string) {
    const result = await this.PayRollModule.deleteOne({ id });
    return {
      message: 'SUCCESS',
      data: result,
    };
  }
  async search(params) {
    const { keyword, create_date } = params;
    const result = await this.PayRollModule.find({
      name: keyword,
    }).exec();
    return {
      message: 'SUCCESS',
      data: result,
    };
  }
}
