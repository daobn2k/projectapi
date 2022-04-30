import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Query } from 'mongoose';
import {
  CreateTimeSheetsDto,
  QueryListTimeSheets,
} from './dto/create-time-sheets.dto';
import { UpdateTimeSheetsDto } from './dto/update-time-sheets.dto';
import { TimeSheets } from './entities/timesheets.entity';

@Injectable()
export class TimeSheetsService {
  constructor(
    @InjectModel(TimeSheets.name) private TimeSheetsModel: Model<TimeSheets>,
  ) {}

  create(createTimeSheetsDto: CreateTimeSheetsDto) {
    
    const newDepartment = new this.TimeSheetsModel(createTimeSheetsDto);
    
    newDepartment.save();
    return {
      message:"SUCCESS",
      data:newDepartment,
    };
  }

  async findAll(query: QueryListTimeSheets) {
    const { page, perPage } = query;

    const skip: number = (page - 1) * perPage;

    const result = await this.TimeSheetsModel.find()
      .limit(+perPage)
      .skip(skip)
      .populate('user_id')
      .populate('create_by_id')
      .populate('edit_by_id')
      .sort({ create_date: -1 })
      .exec();

    const totalRecord = await this.TimeSheetsModel.find().count().exec();

    return {
      message: 'SUCCESS',
      data: result,
      total: totalRecord,
    };
  }

  async findOne(id: string) {
    const result = await this.TimeSheetsModel.findById(id)
      .populate('create_by_id')
      .populate('edit_by_id')
      .exec();

    return {
      message: 'SUCCESS',
      data: result,
    };
  }

  async update(id: string, updateTimeSheetsDto: UpdateTimeSheetsDto) {
    const result = await this.TimeSheetsModel.findByIdAndUpdate(
      id,
      updateTimeSheetsDto,
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
    const result = await this.TimeSheetsModel.deleteOne({ id });
    return {
      message: 'SUCCESS',
      data: result,
    };
  }
  async search(params) {
    const { keyword, create_date } = params;
    const result = await this.TimeSheetsModel.find({
      name: keyword,
    }).exec();
    return {
      message: 'SUCCESS',
      data: result,
    };
  }
}
