import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Query } from 'mongoose';
import { rgx } from 'src/ultils';
import { CreateEvaluateDto, QueryListEvaluate } from './dto/create-evaluate.dto';
import { UpdateEvaluateDto } from './dto/update-evaluate.dto';
import { Evaluate } from './entities/evaluate.entity';

@Injectable()
export class EvaluateService {
  constructor(@InjectModel(Evaluate.name) private EvaluateModel: Model<Evaluate>) {}

  async create(create: CreateEvaluateDto) {
    const newE = new this.EvaluateModel(create);
    const result = await newE.save();
    return {
      message: 'SUCCESS',
      data: result,
    };
  }

  async findAll(query: QueryListEvaluate) {
    const { page = 1, perPage = 5, fileds = 'name', keyword = '' } = query;
    const skip: number = (page - 1) * perPage;
    let result;
    if (keyword !== '') {
      result = await this.EvaluateModel.find({ [fileds]: rgx(keyword) })
        .limit(+perPage)
        .skip(skip)
        .populate('earn_id')
        .populate('create_by_id')
        .populate('edit_by_id')
        .exec();
    } else if (page && perPage) {
      result = await this.EvaluateModel.find({})
        .limit(+perPage)
        .skip(skip)
        .populate('earn_id')
        .populate('create_by_id')
        .populate('edit_by_id')
        .exec();
    } else {
      result = await this.EvaluateModel.find({})
        .populate('earn_id')
        .populate('create_by_id')
        .populate('edit_by_id')
        .exec();
    }
    const totalRecord = await this.EvaluateModel.find().count().exec();

    return {
      message: 'SUCCESS',
      data: result,
      total: totalRecord,
    };
  }

  async findOne(id: string) {
    const result = await this.EvaluateModel.findById(id)
      .populate('earn_id')
      .populate('create_by_id')
      .populate('edit_by_id')
      .exec();
    return {
      message: 'SUCCESS',
      data: result,
    };
  }

  async update(id: string, update: UpdateEvaluateDto) {
    const result = await this.EvaluateModel.findByIdAndUpdate(id, update, {
      new: true,
    });
    return {
      message: 'SUCCESS',
      data: result,
    };
  }

  async remove(id: string) {
    const result = await this.EvaluateModel.deleteOne({ id });

    return {
      message: 'SUCCESS',
      data: result,
    };
  }
}
