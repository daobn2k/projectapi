import axios from "axios";

const addCategory = async(data) =>{
  return await axios.post('/category', data);
}

const UpdateCategory = async(id,data) =>{
  return await axios.put(`/category/${id}`, data);
}
const DeleteCategory = async(id) =>{
  return await axios.delete(`/category/${id}`);
}

const SearchCategory = async(data) =>{
  return await axios.post(`/category/searchname`,data)
}
export { addCategory ,UpdateCategory,DeleteCategory,SearchCategory};
