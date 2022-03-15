import { Injectable, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Query } from 'mongoose';
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
    const newDepartment = new this.EducationModel(createDepartmentDto);
    newDepartment.save();
    return 'success';
  }

  async findAll(query: QueryListEducation) {
    const { page, perPage } = query;

    const skip: number = (page - 1) * perPage;

    const result = await this.EducationModel.find()
      .limit(+perPage)
      .skip(skip)
      .populate('create_by_id')
      .populate('edit_by_id')
      .exec();

    const totalRecord = await this.EducationModel.find().count().exec();
    return {
      message: 'SUCCESS',
      data: result,
      total: totalRecord,
    };
  }

  findOne(id: string) {
    return this.EducationModel.findById(id)
      .populate('create_by_id')
      .populate('edit_by_id')
      .exec();
  }

  update(id: string, updateDepartmentDto: UpdateEducationDto) {
    return this.EducationModel.findByIdAndUpdate(id, updateDepartmentDto, {
      new: true,
    });
  }

  async remove(id: string) {
    const result = await this.EducationModel.deleteOne({ id });
    return result;
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
