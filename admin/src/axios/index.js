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
const GetUser = ()=>{
   return axios.get('/user',config);
 }
const GetCategory = ()=>{
   return axios.get('/category',config);
}

const getProductbyId = (id) =>{
      return axios.get(`/product/${id}`,config);
}
const getUserbyId = (id) =>{
      return axios.get(`/user/searchID=${id}`,config);
}
export { getCategory,GetProduct ,getProductbyId,GetUser,getUserbyId,GetCategory}