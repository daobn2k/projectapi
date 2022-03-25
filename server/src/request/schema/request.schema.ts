import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/users/entities/user.entity';

export type RequestDocument = Request & Document;

@Schema()
export class Request {

  @Prop({required:true,type:String,maxlength:256})
  name:string;

  @Prop({maxlength:4000,type:String,required:false})
  description:string;

  @Prop({type:Date,required:true})
  from_date:Date

  @Prop({type:Date,required:true})
  end_date:Date
  
  @Prop({default:Date.now()})
  create_date:Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user_id:User;

  @Prop({type:String})
  status:string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  create_by_id:User;
  
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  edit_by_id: User;

}
export const RequestSchema = SchemaFactory.createForClass(Request);
