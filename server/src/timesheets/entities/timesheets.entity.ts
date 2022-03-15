import { ObjectId } from "mongoose";

export class TimeSheets {
  name: String;
  start_date:Date;
  end_date:Date;
  status:boolean;
  update_date:Date;
  create_by_id:ObjectId;
  edit_by_id:ObjectId;
};
