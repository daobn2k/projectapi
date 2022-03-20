import axios from "axios";
import { API_END_POINT } from "../lib/axios";

const config = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
};

const getCategory = () => {
  return axios.get("/category", config);
};

const GetProduct = () => {
  return axios.get("/product", config);
};
const GetUser = (data) => {
  return axios.get(`${API_END_POINT}/users`,{params:data}, config);
};
const GetCategory = () => {
  return axios.get("/category", config);
};
const getProductbyId = (id) => {
  return axios.get(`/product/${id}`, config);
};
const getUserbyId = (id) => {
  return axios.get(`${API_END_POINT}/users/${id}`, config);
};
const getCategorybyId = (id) => {
  return axios.get(`/category/${id}`, config);
};

const getStock = () => {
  return axios.get(`/stock`, config);
};
const getStockById = (id) => {
  return axios.get(`/stock/${id}`, config);
};

export const getOrder = () => {
  return axios.get(`/order`, config);
};

export const getOrderDetail = (id) => {
  return axios.get(`/detail_code/${id}`, config);
};

export {
  getCategory,
  GetProduct,
  getProductbyId,
  GetUser,
  getUserbyId,
  GetCategory,
  getCategorybyId,
  getStock,
  getStockById,
};
