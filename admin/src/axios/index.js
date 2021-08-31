import axios from "axios"

const config = {
   headers: {'Access-Control-Allow-Origin': '*'
   ,'Content-Type' : 'application/json'
 }
 };

const getCategory = () => {
   return axios.get('/category',config)
}

const GetProduct = ()=>{
   return axios.get('/product',config);
 }

const getProductbyId = (id) =>{
      return axios.get(`/product/${id}`,config);
}
export { getCategory,GetProduct ,getProductbyId}