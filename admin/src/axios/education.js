import axios from "axios";
import { API_END_POINT } from "../lib/axios";

export const getDataEducation = (data) => {
  return axios.get(`${API_END_POINT}/education`, { params: data });
};

export const addEducation = async (data) => {
  return await axios.post(`${API_END_POINT}/education`, data);
};
export const editEducation = async (id, data) => {
  return await axios.patch(`${API_END_POINT}/education/${id}`, data);
};

export const deleteEducation = async (id) => {
  return await axios.delete(`${API_END_POINT}/education/${id}`);
};
