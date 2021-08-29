import axios from "axios";





const addNewProduct = async(data) =>{
  return await axios.post('/product', data);

}
export { addNewProduct };
