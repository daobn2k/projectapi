import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/users/entities/user.entity';

export type EducationDocument = Education & Document;

@Schema()
export class Education {
  @Prop({ required: true })
  name: string;

  @Prop({ required: false, default: '' })
  description: string;

  @Prop({ default: Date.now() })
  create_date: Date;

  @Prop({ default: false })
  status: boolean;

  @Prop({ default: Date.now() })
  update_date: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  create_by_id: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  edit_by_id: User;
}
export const EducationSchema = SchemaFactory.createForClass(Education);
