import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/users/entities/user.entity';

export type DepartmentDocument = Department & Document;

@Schema()
export class Department {
  @Prop()
  name: string;
  
  @Prop()
  description:string;
  
  @Prop({default:Date.now()})
  create_date:Date;
  
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User'  })
  admin_user_id:User;
  @Prop({default:false})
  status:boolean;

  @Prop({default:Date.now()})
  update_date:Date;
  
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  create_by_id:User
  
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  edit_by_id: User;
}
export const DepartmentSchema = SchemaFactory.createForClass(Department);
