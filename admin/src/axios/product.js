import axios from "axios";

const addNewProduct = async(data) =>{
  return await axios.post('/product', data);
}

const UpdateNewProduct = async(id,data) =>{
  return await axios.put(`/product/update/${id}`, data);
}
const DeleteProduct = async(id) =>{
  return await axios.delete(`/product/${id}`);
}

const SearchProduct = async(data) =>{
  return await axios.post(`/product/searchname`,data)
}

export { addNewProduct ,DeleteProduct,UpdateNewProduct ,SearchProduct};

