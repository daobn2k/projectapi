import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/users/entities/user.entity';

export type EvaluateDocument = Evaluate & Document;

@Schema()
export class Evaluate {
  @Prop({required:true,type:String})
  name: string;
  @Prop ({required:true,type:String})
  category_reward:string
  @Prop ({required:true,type:String})
  reason_reward:string;
  @Prop({required:true,type:Date,default:Date.now()})
  date_reward:Date;
  @Prop({default:Date.now()})
  create_date:Date;
  @Prop({default:Date.now()})
  update_date:Date;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  create_by_id:User
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  edit_by_id: User;
  @Prop ({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
  earn_id:User;
  @Prop({required:true,type:String})
  type:string
}
export const EvaluateSchema = SchemaFactory.createForClass(Evaluate);
