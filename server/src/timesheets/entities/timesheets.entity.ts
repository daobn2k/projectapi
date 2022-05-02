import { ObjectId } from "mongoose";

export class TimeSheets {
  user_id: ObjectId;
  start_date_time:Date;
  end_date_time:Date;
  create_date:Date;
  status:boolean;
  update_date:Date;
  create_by_id:ObjectId;
  edit_by_id:ObjectId;
};
