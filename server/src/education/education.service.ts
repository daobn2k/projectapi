import { Injectable, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Query } from 'mongoose';
import { rgx } from 'src/ultils';
import {
  CreateEducationDto,
  QueryListEducation,
} from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import { Education } from './entities/education.entity';

@Injectable()
export class EducationService {
  constructor(
    @InjectModel(Education.name) private EducationModel: Model<Education>,
  ) {}

  create(createDepartmentDto: CreateEducationDto) {
    const newEducation = new this.EducationModel(createDepartmentDto);
    newEducation.save();
    return {
      message: 'SUCCESS',
      data: {},
    };
  }

  async findAll(query: QueryListEducation) {
    const { page , perPage, fileds = 'name', keyword = '' } = query;
    const skip: number = (page - 1) * perPage;
    let result;
    if (keyword !== '') {
      result = await this.EducationModel.find({ [fileds]: rgx(keyword) })
        .limit(+perPage)
        .skip(skip)
        .populate('create_by_id')
        .populate('edit_by_id')
        .exec();
    } else if (page && perPage) {
      result = await this.EducationModel.find({})
        .limit(+perPage)
        .skip(skip)
        .populate('create_by_id')
        .populate('edit_by_id')
        .exec();
    } else {
      result = await this.EducationModel.find({})
        .populate('create_by_id')
        .populate('edit_by_id')
        .exec();
    }
    const totalRecord = await this.EducationModel.find().count().exec();

    return {
      message: 'SUCCESS',
      data: result,
      total: totalRecord,
    };
  }

  async findOne(id: string) {
    const result = await this.EducationModel.findById(id)
      .populate('create_by_id')
      .populate('edit_by_id')
      .exec();
    return {
      message: 'SUCCESS',
      data: result,
    };
  }

  async update(id: string, updateDepartmentDto: UpdateEducationDto) {
    const result = await this.EducationModel.findByIdAndUpdate(
      id,
      updateDepartmentDto,
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
    const result = await this.EducationModel.deleteOne({ id });
    return {
      message: 'SUCCESS',
      data: result,
    };
  }
  async search(params) {
    const { keyword, create_date } = params;
    console.log(params, 'params');
    const result = await this.EducationModel.find({
      name: keyword,
      create_date: create_date,
    })
      .populate('create_by_id')
      .populate('edit_by_id')
      .exec();
    return {
      message: 'SUCCESS',
      data: result,
    };
  }
}
