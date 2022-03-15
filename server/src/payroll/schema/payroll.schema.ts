import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/users/entities/user.entity';

export type PayRollDocument = PayRoll & Document;

@Schema()
export class PayRoll {
  @Prop()
  name: string;
  
  @Prop({default:0})

  salary_daily:number;
  
  @Prop({default:0})

  quantity:number;

  @Prop({default:0})
  total:number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user_id:User

  @Prop()
  payment_date:Date;

  @Prop({default:Date.now()})
  create_date:Date;

  @Prop()
  status:string;

  @Prop({default:Date.now()})
  update_date:Date;
  
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  edit_by_id: User;
}
export const PayRollSchema = SchemaFactory.createForClass(PayRoll);
