import { Module, Scope } from '@nestjs/common';
import { TimeSheetsService } from './timesheets.service';
import { TimeSheetsController } from './timesheets.controller';
import { TimeSheets } from './entities/timesheets.entity';
import { TimeSheetsSchema } from './schema/timesheets.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TimeSheets.name, schema: TimeSheetsSchema }]),
  ],
  controllers: [TimeSheetsController],
  providers: [TimeSheetsService],
})
export class TimeSheetsModule {}
