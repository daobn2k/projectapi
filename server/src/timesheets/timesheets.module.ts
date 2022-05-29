import { Module, Scope } from '@nestjs/common';
import { TimeSheetsService } from './timesheets.service';
import { TimeSheetsController } from './timesheets.controller';
import { TimeSheets } from './entities/timesheets.entity';
import { TimeSheetsSchema } from './schema/timesheets.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TimeSheets.name, schema: TimeSheetsSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: TimeSheetsSchema }]),
  ],
  controllers: [TimeSheetsController],
  providers: [TimeSheetsService,UsersService],
})
export class TimeSheetsModule {}
