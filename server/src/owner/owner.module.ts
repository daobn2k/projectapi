import { Module } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { OwnerController } from './owner.controller';
import { Owner } from './entities/owner.entity';
import { OwnerSchema } from './schema/owner.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Owner.name, schema: OwnerSchema }]),
  ],
  controllers: [OwnerController],
  providers: [OwnerService],
})
export class OwnerModule {}
