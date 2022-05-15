import axios from "axios";
import { API_END_POINT } from "../lib/axios";

export const getDataDeaprtment = (data) => {
  return axios.get(`${API_END_POINT}/department`, { params: data });
};

export const newDepartment = (data) => {
  return axios.post(`${API_END_POINT}/department`, data);
};
export const editDepartment = async (id, data) => {
  return await axios.patch(`${API_END_POINT}/department/${id}`, data);
};

export const deleteDepartment = async (id) => {
  return await axios.delete(`${API_END_POINT}/department/${id}`);
};

