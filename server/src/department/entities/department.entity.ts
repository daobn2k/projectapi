import { ObjectId } from "mongoose";

export class Department {
  name: String;
  description:string;
  create_date:Date;
  status:boolean;
  update_date:Date;
  admin_user_id:ObjectId;
  create_by_id:ObjectId;
  edit_by_id:ObjectId;
};
