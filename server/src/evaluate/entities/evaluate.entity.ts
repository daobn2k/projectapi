import { ObjectId } from "mongoose";

export class Evaluate {
  name: string;
  description:string;
  create_date:Date;
  earn_id:ObjectId;
  reason_reward:string;
  category_reward:string;
  date_reward:Date;
  status:boolean;
  update_date:Date;
  create_by_id:ObjectId;
  edit_by_id:ObjectId;
  type:string;
};
