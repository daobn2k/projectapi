import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Query } from 'mongoose';
import {
  CreateDepartmentDto,
  QueryListDepartment,
} from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Department } from './entities/department.entity';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectModel(Department.name) private DepartmentModel: Model<Department>,
  ) {}

  async create(createDepartmentDto: CreateDepartmentDto) {
    const newDepartment = new this.DepartmentModel(createDepartmentDto);
    const result = await newDepartment.save();
    return {
      message:'SUCCESS',
      data:result,
    };
  }

  async findAll(query: QueryListDepartment) {
    const { page, perPage } = query;

    const skip: number = (page - 1) * perPage;
    const result = await this.DepartmentModel.find()
      .limit(+perPage)
      .skip(skip)
      .populate('create_by_id')
      .populate('edit_by_id')
      .exec();
    const totalRecord = await this.DepartmentModel.find().count().exec();
    return {
        message:'SUCCESS',
        data:result,
        total:totalRecord
    };
  }

  async findOne(id: string) {
    const result  = await this.DepartmentModel.findById(id)
      .populate('create_by_id')
      .populate('edit_by_id')
      .exec();
    return {
      message:'SUCCESS',
      data: result
    }
  }

  async update(id: string, updateDepartmentDto: UpdateDepartmentDto) {
    const result = await this.DepartmentModel.findByIdAndUpdate(id, updateDepartmentDto, {
      new: true,
    });
    return {
      message:'SUCCESS',
      data:result
    }
  }

  async remove(id: string) {
    const result = await this.DepartmentModel.deleteOne({ id });

    return {
      message:'SUCCESS',
      data:result
    };
  }

}
