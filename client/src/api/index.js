import axios from "axios"

const config = {
   headers: {'Access-Control-Allow-Origin': '*'
   ,'Content-Type' : 'application/json'
 }
 };
const GetProduct = ()=>{
   return axios.get('/product',config);
 }

const GetCategory = ()=>{
   return axios.get('/category',config);
}

const getProductbyId = (id) =>{
      return axios.get(`/product/${id}`,config);
}

const getCategorybyId = (id) =>{
      return axios.get(`/category/${id}`,config);
}


export { 
   GetProduct ,
   getProductbyId,
   GetCategory,
   getCategorybyId
}