import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Department } from 'src/department/entities/department.entity';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({required:true,type:String,maxlength:256})
  username:string
  
  @Prop({required:true,type:String,maxlength:256})
  password:string

  @Prop({required:true,type:String,maxlength:256})
  name: string;

  @Prop({default:Date.now()})
  dob: Date;

  @Prop({required:true,type:String,maxlength:256})
  address:string;

  @Prop()
  avatar:string;

  @Prop({required:true,type:String,maxlength:256})
  email:string;
  
  @Prop({default:Date.now()})
  create_date:Date;

  @Prop({required:true,type:String,maxlength:256})
  education:string;

  @Prop({required:true,type:String,maxlength:256})
  role:String;
  
  @Prop({default:false})
  status:boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Department' })
  department_id: Department;
}
export const UserSchema = SchemaFactory.createForClass(User);
