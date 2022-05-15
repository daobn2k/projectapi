import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/users/entities/user.entity';

export type PayRollDocument = PayRoll & Document;

@Schema()
export class PayRoll {
  
  @Prop({default:0,required:true})

  salary:number;
  @Prop({ default:0 })

  salary_bonus:number;
  
  @Prop()
  in_month:string;

  @Prop({required:true})

  total_working_time:string;

  @Prop({default:0,required:true})
  total_money:number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user_id:User

  @Prop()
  payment_date:Date;

  @Prop({default:Date.now()})
  create_date:Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  create_by_id: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  edit_by_id: User;
}
export const PayRollSchema = SchemaFactory.createForClass(PayRoll);
