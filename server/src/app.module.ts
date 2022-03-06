import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { OwnerModule } from './owner/owner.module';
@Module({
  imports: [
    UsersModule,
    OwnerModule,
    MongooseModule.forRoot('mongodb://127.0.0.1/nest'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
