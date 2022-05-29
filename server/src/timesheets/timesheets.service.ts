import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { checkPermisstionUser } from 'src/ultils';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
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

  async findAll(query: any) {
    const { page , perPage , fileds = 'name', keyword = ''} = query;

    
 
    let result;
    let totalRecord;

      const skip: number = (page - 1) * perPage;
      
      if (Object.keys(query).length > 0) {
        delete query.page
        delete query.perPage
        result = await this.TimeSheetsModel
          .find({...query})
          .limit(+perPage)
          .skip(skip)
          .sort({ create_date: -1 })
          .populate('user_id')
          .populate('create_by_id')
          .populate('edit_by_id')
          .exec();
      } else {
        result = await this.TimeSheetsModel
          .find({})
          .sort({ create_date: -1 })
          .populate('user_id')
          .populate('create_by_id')
          .populate('edit_by_id')
          .exec();
      }
      totalRecord = await this.TimeSheetsModel.find().count().exec();

    return {
      message: 'SUCCESS',
      data: result,
      total: totalRecord,
    };
  }

  async findOne(id: string) {
    const result = await this.TimeSheetsModel.findById(id)
      .populate('user_id')
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
    const result = await this.TimeSheetsModel.findByIdAndDelete(id, { new: true });
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

  async getPayroll(body){
    const { id } = body
    
    const result = await this.TimeSheetsModel.find({user_id:id}).populate('user_id').exec();

    
    return {
      message: 'SUCCESS',
      data: result,
    } 
  }
}

