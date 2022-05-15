import axios from 'axios';
import { API_END_POINT } from "../lib/axios";

export const getDataRole = (data) =>{
  return axios.get(`${API_END_POINT}/role`,{params:data});
}

export const newRole = (data) => {
  return axios.post(`${API_END_POINT}/role`, data);
};
export const editRole = async (id, data) => {
  return await axios.patch(`${API_END_POINT}/role/${id}`, data);
};

export const deleteRole = async (id) => {
  return await axios.delete(`${API_END_POINT}/role/${id}`);
};
