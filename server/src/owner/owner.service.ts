import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Query } from 'mongoose';
import { CreateOwnerDto, QueryListOwner } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { Owner } from './entities/owner.entity';

@Injectable()
export class OwnerService {
  constructor(@InjectModel(Owner.name) private OwnerModel: Model<Owner>) {}

  create(createOwnerDto: CreateOwnerDto) {
    const newOwner = new this.OwnerModel(createOwnerDto);
    newOwner.save();
    return 'success';
  }

  findAll(query: QueryListOwner) {
    const { page, perPage } = query;

    const skip: number = (page - 1) * perPage;
    return this.OwnerModel.find()
      .limit(+perPage)
      .skip(skip)
      .exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} owner`;
  }

  update(id: number, updateOwnerDto: UpdateOwnerDto) {
    return `This action updates a #${id} owner`;
  }

  remove(id: number) {
    return `This action removes a #${id} owner`;
  }
}
