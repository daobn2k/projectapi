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
export { addNewProduct ,DeleteProduct,UpdateNewProduct};
