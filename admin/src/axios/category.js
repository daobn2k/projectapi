import axios from "axios";

const addCategory = async(data) =>{
  return await axios.post('/category', data);
}

const UpdateCategory = async(id,data) =>{
  return await axios.put(`/category/update/${id}`, data);
}
const DeleteCategory = async(id) =>{
  return await axios.delete(`/category/${id}`);
}
export { addCategory ,UpdateCategory,DeleteCategory};
