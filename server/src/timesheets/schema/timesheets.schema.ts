import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/users/entities/user.entity';

export type TimeSheetsDocument = TimeSheets & Document;

@Schema()
export class TimeSheets {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' ,required:true})
  user_id: User;
  
  @Prop()
  start_date_time:Date;

  @Prop()
  end_date_time:Date;

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
export const TimeSheetsSchema = SchemaFactory.createForClass(TimeSheets);
