import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/users/entities/user.entity';
import { Department } from 'src/department/entities/department.entity';

export type RoleDocument = Role & Document;

@Schema()
export class Role {
  @Prop({type:String,required:true,maxlength:256})
  name: string;
  
  @Prop({type:String,maxlength:4000})
  description:string;

  @Prop({default:Date.now()})
  create_date:Date;

  @Prop({default:false})
  status:boolean;

  @Prop({default:Date.now()})
  update_date:Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  create_by_id:User
  
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  edit_by_id: User;
}
export const RoleSchema = SchemaFactory.createForClass(Role);
