import { ObjectId } from "mongoose";

export class PayRoll {
  name: String;
  quantity:number;
  total:number;
  salary_daily:number;
  user_id:ObjectId;
  payment_date:Date;
  status:boolean;
  update_date:Date;
  create_by_id:ObjectId;
  edit_by_id:ObjectId;
};
