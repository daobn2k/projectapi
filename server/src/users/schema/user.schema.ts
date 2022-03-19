import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Department } from 'src/department/entities/department.entity';
import { Education } from 'src/education/entities/education.entity';

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

  @Prop({required:true,type:'number',maxlength:11})
  phone:number;

  @Prop()
  avatar:string;

  @Prop({required:true,type:String,maxlength:256})
  email:string;

  @Prop({maxlength:4000,type:String,required:false})
  description:string;

  @Prop({default:Date.now()})
  create_date:Date;

  @Prop({required:true,type:String,maxlength:256})
  certificate:string;

  @Prop({required:true,type:String,maxlength:256})
  role:String;
  
  @Prop({default:false})
  status:boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Department' })
  department_id: Department;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Education' })

  education_id:Education;
}
export const UserSchema = SchemaFactory.createForClass(User);
