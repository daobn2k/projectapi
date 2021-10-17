import axios from "axios";

const config = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
};
const GetProduct = () => {
  return axios.get("/product", config);
};

const GetCategory = () => {
  return axios.get("/category", config);
};

const getProductHot = () => {
  return axios.get(`/producthot`, config);
};
const getProductFavorite = () => {
  return axios.get(`/productfavorite`, config);
};
const getCategorybyId = (id) => {
  return axios.get(`/category/${id}`, config);
};

const getProductByCategoryId = (id) => {
  return axios.get(`product/categoryid/${id}`, config);
};
const Login = async (data) => {
  return await axios.post("/user/login", data);
};

const addNewAccount = async (data) => {
  return await axios.post("/user/adduserfromadmin", data);
};
export const getUserbyId = (id) => {
  return axios.get(`/user/searchID=${id}`, config);
};

const postCheckOut = async (data) => {
  return await axios.post("/cart", data);
};
const getProductbyId = (id) => {
  return axios.get(`/product/${id}`, config);
};

export const getListFavorite = (id) => {
  return axios.get(`/favorite/${id}`, config);
};

export const SearchProduct = async (data) => {
  return await axios.post(`/product/searchname`, data);
};

const getOrderById = (id) => {
  return axios.get(`/order/${id}`, config);
};
export const changeStatus = async (data) => {
  return await axios.post(`/favorite`, data);
};

export const getOrderDetail = (id) => {
  return axios.get(`/detail_code/${id}`, config);
};
export {
  GetProduct,
  getProductbyId,
  GetCategory,
  getCategorybyId,
  Login,
  addNewAccount,
  postCheckOut,
  getProductHot,
  getProductFavorite,
  getOrderById,
  getProductByCategoryId,
};
