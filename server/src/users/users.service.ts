import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto, QueryListUsers } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    createdUser.save();
    return;
  }

  findAll(query: QueryListUsers): Promise<User[]> {
    const { page = 1, perPage = 5 } = query;
    const skip: number = (page - 1) * perPage;
    return this.userModel
      .find({})
      .limit(+perPage)
      .skip(skip)
      .populate('OwnerId')
      .exec();
  }

  findOne(id: string) {
    return this.userModel.findById(id).exec();
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
  }

  async remove(id: string) {
    const result = await this.userModel.deleteOne({ id });

    return 'success';
  }
}
