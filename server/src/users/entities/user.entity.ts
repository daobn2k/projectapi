import { ObjectId } from "mongoose";

export class User {
  username:String;
  password:String;
  name: String;
  dob: Date;
  address:String;
  email:String;
  create_date:Date;
  education_id:ObjectId;
  status:boolean;
  department_id:ObjectId;
  role:string;
  certificate:String;
  phone:number;
  description:string;
  avatar:string;
}
