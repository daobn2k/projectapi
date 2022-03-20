import { ObjectId } from "mongoose";

export class Request {
  name:string;

  description:string;

  from_date:Date

  end_date:Date
  
  create_date:Date;

  user_id:ObjectId;

  status:string;

  create_by_id:ObjectId;
  
  edit_by_id: ObjectId;
}
