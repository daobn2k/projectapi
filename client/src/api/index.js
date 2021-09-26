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

const Login = async(data) =>{
   return await axios.post('/user/login', data);
 }

 const addNewAccount = async(data) =>{
   return await axios.post('/user/adduserfromadmin', data);
 }
 
export { 
   GetProduct ,
   getProductbyId,
   GetCategory,
   getCategorybyId,
   Login,
   addNewAccount
}