import { Module } from '@nestjs/common';
import { EvaluateService } from './evaluate.service';
import { EvaluateController } from './evaluate.controller';
import { Evaluate } from './entities/evaluate.entity';
import { EvaluateSchema } from './schema/evaluate.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Evaluate.name, schema: EvaluateSchema }]),
  ],
  controllers: [EvaluateController],
  providers: [EvaluateService],
})
export class EvaluateModule {}
