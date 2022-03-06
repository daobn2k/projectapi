import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Owner } from 'src/owner/entities/owner.entity';
export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Owner' })
  ownerId: Owner;
}
export const UserSchema = SchemaFactory.createForClass(User);
