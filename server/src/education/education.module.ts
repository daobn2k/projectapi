import { Module } from '@nestjs/common';
import { EducationService } from './education.service';
import { EducationController } from './education.controller';
import { Education } from './entities/education.entity';
import { EducationSchema } from './schema/education.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Education.name, schema: EducationSchema }]),
  ],
  controllers: [EducationController],
  providers: [EducationService],
})
export class EducationModule {}
