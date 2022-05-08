import { ObjectId } from "mongoose";

export class PayRoll {
  total_working_time:number;
  total_money:number;
  salary:number;
  salary_bonus:number;
  in_month:String;
  user_id:ObjectId;
  payment_date:Date;
  create_by_id:ObjectId;
  edit_by_id:ObjectId;
  create_date:Date;
};
