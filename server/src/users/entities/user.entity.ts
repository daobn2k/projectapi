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
  role_id:ObjectId;
  certificate:String;
  school:String;
  salary:String;
  phone:String;
  description:string;
  avatar:String;
  sex:String;
}
