import axios from "axios";

const Login = async(data) =>{
  return await axios.post('/user/login', data);
}
export { Login };
