import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { rgx } from 'src/ultils';
import { CreateUserDto, QueryListUsers } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);

    const result = await createdUser.save();
    return result;
  }

  async findAll(query: QueryListUsers) {
    const { page = 1, perPage = 5, fileds = 'name', keyword = '' } = query;
    const skip: number = (page - 1) * perPage;
    let result;
    if (keyword !== '') {
      result = await this.userModel
        .find({ [fileds]: rgx(keyword) })
        .limit(+perPage)
        .skip(skip)
        .sort({ create_date: -1 })
        .populate('education_id')
        .populate('department_id')
        .populate('role_id')
        .exec();
    } else if (page && perPage) {
      result = await this.userModel
        .find({})
        .limit(+perPage)
        .skip(skip)
        .sort({ create_date: -1 })
        .populate('education_id')
        .populate('department_id')
        .populate('role_id')
        .exec();
    } else {
      result = await this.userModel
        .find({})
        .sort({ create_date: -1 })
        .populate('education_id')
        .populate('department_id')
        .populate('role_id')
        .exec();
    }
    const totalRecord = await this.userModel.find().count().exec();

    return {
      message: 'SUCCESS',
      data: result,
      total: totalRecord,
    };
  }

  async findOne(id: string) {
    const result = await this.userModel
      .findById(id)
      .populate('education_id')
      .populate('department_id')
      .populate('role_id')
      .exec();

    return {
      message: 'SUCCESS',
      data: result,
    };
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const result = await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });
    return {
      message: 'SUCCESS',
      data: result,
    };
  }

  async remove(id: string) {
    const result = await this.userModel.findByIdAndDelete(id, { new: true });
    return {
      message: 'SUCCESS',
      data: result,
    };
  }

  async search(params) {
    const { keyword, create_date } = params;
    const result = await this.userModel
      .find({ name: keyword, create_date: create_date })
      .populate('department_id')
      .exec();
    return {
      message: 'SUCCESS',
      data: result,
    };
  }
  async login(params: CreateUserDto) {
    const { username, password } = params;

    const result = await this.userModel
      .findOneAndUpdate(
        { username: username, password: password },
        { status: true },
        { new: true },
      )
      .exec();

    return {
      message: 'SUCCESS',
      data: result,
    };
  }

  async logout(id: string) {
    const result = await this.userModel.findByIdAndUpdate(
      id,
      { status: false },
      { new: true },
    );
    return {
      message: 'SUCCESS',
      data: result,
    };
  }
}
