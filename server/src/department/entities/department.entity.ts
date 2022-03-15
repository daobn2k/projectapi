import { ObjectId } from "mongoose";

export class Department {
  name: String;
  create_date:Date;
  status:boolean;
  update_date:Date;
  create_by_id:ObjectId;
  edit_by_id:ObjectId;
};
