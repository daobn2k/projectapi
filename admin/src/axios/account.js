import axios from "axios";
import { API_END_POINT } from "../lib/axios";

const addNewAccount = async (data) => {
  return await axios.post(`${API_END_POINT}/users`, data);
};

const UpdateAccount = async (id, data) => {
  return await axios.patch(`${API_END_POINT}/users/${id}`, data);
};
const DeleteAccount = async (id) => {
  return await axios.delete(`${API_END_POINT}/users/${id}`);
};

const changePassword = async (data) => {
  return await axios.post(`${API_END_POINT}/users/updatePwd`, data);
};

const SearchAccount = async (data) => {
  return await axios.post(`/users/searchname`, data); 
};

export {
  addNewAccount,
  DeleteAccount,
  UpdateAccount,
  SearchAccount,
  changePassword,
};
