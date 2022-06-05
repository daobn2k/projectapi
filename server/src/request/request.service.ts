import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as moment from 'moment';
import { Model } from 'mongoose';
import { rgx } from 'src/ultils';
import { CreateRequestDto, QueryListRequests } from './dto/create-user.dto';
import { UpdateRequestDto } from './dto/update-user.dto';
import { Request } from './entities/request.entity';

@Injectable()
export class RequestService {
  constructor(@InjectModel(Request.name) private requestModel: Model<Request>) {}

  async create(create: CreateRequestDto): Promise<Request> {

    const createdUser = new this.requestModel(create);

    const result = await createdUser.save();
    return result;
  }

  async findAll(query: any) {
    const { page = 1, perPage = 5 ,fileds = 'name' ,keyword = ''} = query;
    const skip: number = (page - 1) * perPage;
    let result;
    if (Object.keys(query).length > 0) {
      delete query.page
      delete query.perPage
      if(query.create_date){
        const start = moment(query.create_date).startOf('day')
        const end = moment(query.create_date).endOf('day')
        query.create_date = {$gte:start,$lte:end}
      }
      if(query.end_date){
        const start = moment(query.end_date).startOf('day')
        const end = moment(query.end_date).endOf('day')
        query.end_date = {$gte:start,$lte:end}
      } 
      if(query.from_date){
        const start = moment(query.from_date).startOf('day')
        const end = moment(query.from_date).endOf('day')
        query.from_date = {$gte:start,$lte:end}
      } 

      console.log(query,"query");
      
      result = await this.requestModel
        .find({...query})
        .limit(+perPage)
        .skip(skip)
        .sort({ create_date: -1 })
        .populate('create_by_id')
        .populate('user_id')
        .populate('edit_by_id')
        .exec();
    } else {
      result = await this.requestModel
        .find({})
        .sort({ create_date: -1 })
        .populate('create_by_id')
        .populate('user_id')
        .populate('edit_by_id')
        .exec();
    }
    const totalRecord = await this.requestModel.find().count().exec();
    return {
      message: 'SUCCESS',
      data: result,
      total: totalRecord,
    };
  }

  async findOne(id: string) {
    const result = await this.requestModel
      .findById(id)
      .populate('create_by_id')
      .populate('user_id')
      .populate('edit_by_id')
      .exec();

    return {
      message: 'SUCCESS',
      data: result,
    };
  }


  async update(id: string, update: UpdateRequestDto) {
    const result = await this.requestModel.findByIdAndUpdate(id, update, {
      new: true,
    });
    return {
      message: 'SUCCESS',
      data: result,
    };
  }

  async remove(id: string) {
    const result = await this.requestModel.findByIdAndDelete(id,{new:true});
    return {
      message: 'SUCCESS',
      data: result,
    };
  }

  async search(params) {
    const { keyword, create_date } = params;
    const result = await this.requestModel
      .find({ name: keyword, create_date: create_date })
      .populate('department_id')
      .exec();
    return {
      message: 'SUCCESS',
      data: result,
    };
  }
  
}
