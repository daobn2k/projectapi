import axios from "axios";
import { API_END_POINT } from "../lib/axios";

const config = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
};

const getRequest = (data) => {
  return axios.get(`${API_END_POINT}/request`,{params:data}, config);
};

const GetProduct = () => {
  return axios.get("/product", config);
};
const GetUser = (data) => {
  return axios.get(`${API_END_POINT}/users`,{params:data}, config);
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

const getRequestById = (id) => {
  return axios.get(`${API_END_POINT}/request/${id}`, config);
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

export const getDataTimeSheet = (data) => {
  return axios.get(`${API_END_POINT}/timesheets`,{params:data},config)
}

export const getDataPayRoll = (data) => {
  return axios.get(`${API_END_POINT}/payroll`,{params:data},config)
}

export const getPayrollDetail = (id) => {
  return axios.get(`${API_END_POINT}/payroll/${id}`, config);
};
export {
  getRequest,
  GetProduct,
  getProductbyId,
  GetUser,
  getUserbyId,
  getCategorybyId,
  getStock,
  getStockById,
  getRequestById
};
