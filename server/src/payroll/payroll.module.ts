import { Module } from '@nestjs/common';
import { PayRollService } from './payroll.service';
import { PayRollController } from './payroll.controller';
import { PayRoll } from './entities/payroll.entity';
import { PayRollSchema } from './schema/payroll.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PayRoll.name, schema: PayRollSchema }]),
  ],
  controllers: [PayRollController],
  providers: [PayRollService],
})
export class PayRollModule {}
