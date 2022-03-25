import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Query } from 'mongoose';
import { rgx } from 'src/ultils';
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
      message: 'SUCCESS',
      data: result,
    };
  }

  async findAll(query: QueryListDepartment) {
    const { page = 1, perPage = 5, fileds = 'name', keyword = '' } = query;
    const skip: number = (page - 1) * perPage;
    let result;
    if (keyword !== '') {
      result = await this.DepartmentModel.find({ [fileds]: rgx(keyword) })
        .limit(+perPage)
        .skip(skip)
        .populate('create_by_id')
        .populate('edit_by_id')
        .populate('admin_user_id')
        .exec();
    } else if (page && perPage) {
      result = await this.DepartmentModel.find({})
        .limit(+perPage)
        .skip(skip)
        .populate('create_by_id')
        .populate('edit_by_id')
        .populate('admin_user_id')
        .exec();
    } else {
      result = await this.DepartmentModel.find({})
        .populate('create_by_id')
        .populate('edit_by_id')
        .populate('admin_user_id')
        .exec();
    }
    const totalRecord = await this.DepartmentModel.find().count().exec();

    return {
      message: 'SUCCESS',
      data: result,
      total: totalRecord,
    };
  }

  async findOne(id: string) {
    const result = await this.DepartmentModel.findById(id)
      .populate('create_by_id')
      .populate('edit_by_id')
      .exec();
    return {
      message: 'SUCCESS',
      data: result,
    };
  }

  async update(id: string, updateDepartmentDto: UpdateDepartmentDto) {
    const result = await this.DepartmentModel.findByIdAndUpdate(
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
    const result = await this.DepartmentModel.deleteOne({ id });

    return {
      message: 'SUCCESS',
      data: result,
    };
  }
}
