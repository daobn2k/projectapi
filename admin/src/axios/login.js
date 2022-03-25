import axios from "axios";
import { API_END_POINT } from "../lib/axios";

const Login = async(data) =>{
  return await axios.post(`${API_END_POINT}/users/login`, data ,{
  });
}
export { Login };
