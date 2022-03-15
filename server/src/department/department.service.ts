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

  create(createDepartmentDto: CreateDepartmentDto) {
    const newDepartment = new this.DepartmentModel(createDepartmentDto);
    newDepartment.save();
    return 'success';
  }

  findAll(query: QueryListDepartment) {
    const { page, perPage } = query;

    const skip: number = (page - 1) * perPage;
    return this.DepartmentModel.find()
      .limit(+perPage)
      .skip(skip)
      .populate('create_by_id')
      .populate('edit_by_id')
      .exec();
  }

  findOne(id: string) {
    return this.DepartmentModel.findById(id)
      .populate('create_by_id')
      .populate('edit_by_id')
      .exec();
  }

  update(id: string, updateDepartmentDto: UpdateDepartmentDto) {
    return this.DepartmentModel.findByIdAndUpdate(id, updateDepartmentDto, {
      new: true,
    });
  }

  async remove(id: string) {
    const result = await this.DepartmentModel.deleteOne({ id });

    console.log('result',result)
    return result;
  }

}
