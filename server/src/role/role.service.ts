import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Query } from 'mongoose';
import { rgx } from 'src/ultils';
import {
  CreateRoleDto,
  QueryListRole,
} from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role.name) private RoleModel: Model<Role>,
  ) {}

  async create(createDepartmentDto: CreateRoleDto) {
    const newDepartment = new this.RoleModel(createDepartmentDto);
    const result = await newDepartment.save();
    return {
      message:'SUCCESS',
      data:result,
    };
  }

  async findAll(query: QueryListRole) {
    const { page , perPage , fileds = 'name', keyword = '' } = query;
    const skip: number = (page - 1) * perPage;
    let result;
    if (keyword !== '') {
      result = await this.RoleModel
        .find({ [fileds]: rgx(keyword) })
        .limit(+perPage)
        .skip(skip)
        .sort({ create_date: -1 })
        .populate('create_by_id')
        .exec();
    } else if (page && perPage) {
      result = await this.RoleModel
        .find({})
        .limit(+perPage)
        .skip(skip)
        .sort({ create_date: -1 })
        .populate('create_by_id')
        .exec();
    } else {
      result = await this.RoleModel
        .find({})
        .sort({ create_date: -1 })
        .populate('create_by_id')
        .exec();
    }

    const totalRecord = await this.RoleModel.find().count().exec();

    return {
      message: 'SUCCESS',
      data: result,
      total: totalRecord,
    };
  }

  async findOne(id: string) {
    const result  = await this.RoleModel.findById(id)
      .populate('create_by_id')
      .exec();
    return {
      message:'SUCCESS',
      data: result
    }
  }

  async update(id: string, updateDepartmentDto: UpdateRoleDto) {
    const result = await this.RoleModel.findByIdAndUpdate(id, updateDepartmentDto, {
      new: true,
    });
    return {
      message:'SUCCESS',
      data:result
    }
  }

  async remove(id: string) {
    const result = await this.RoleModel.findByIdAndDelete(id, { new: true });
    return {
      message: 'SUCCESS',
      data: result,
    };
  }

}
