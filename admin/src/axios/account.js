import axios from "axios";

const addNewAccount = async(data) =>{
  return await axios.post('/user/adduserfromadmin', data);
}

const UpdateAccount = async(id,data) =>{
  return await axios.put(`/user/update/${id}`, data);
}
const DeleteAccount= async(id) =>{
  return await axios.delete(`/user/${id}`);
}
export { addNewAccount ,DeleteAccount,UpdateAccount};
