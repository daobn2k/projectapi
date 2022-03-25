import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DepartmentModule } from './department/department.module';
import { EducationModule } from './education/education.module';
import { TimeSheetsModule } from './timesheets/timesheets.module';
import { PayRollModule } from './payroll/payroll.module';
import { RoleModule } from './role/role.module';
import { RequestModule } from './request/request.module';



@Module({
  imports: [
    UsersModule,
    DepartmentModule,
    EducationModule,
    TimeSheetsModule,
    PayRollModule,
    RoleModule,
    RequestModule,
    MongooseModule.forRoot('mongodb://127.0.0.1/nest'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
