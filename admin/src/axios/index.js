import axios from "axios"

const config = {
   headers: {'Access-Control-Allow-Origin': '*'
   ,'Content-Type' : 'application/json'
 }
 };

const getCategory = () => {
   return axios.get('https://ecomerce-be.herokuapp.com/categories')
}

const GetProduct = ()=>{
   return axios.get('/product',config);
 }
export { getCategory,GetProduct }