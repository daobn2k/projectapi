import axios from "axios";
import { API_END_POINT } from "../lib/axios";

export const getDataEvaluate = (data) => {
  return axios.get(`${API_END_POINT}/evaluate`, { params: data });
};

export const newEvaluate = (data) => {
  return axios.post(`${API_END_POINT}/evaluate`, data);
};
export const editEvaluate = async (id, data) => {
  return await axios.patch(`${API_END_POINT}/evaluate/${id}`, data);
};

export const deleteEvaluate = async (id) => {
  return await axios.delete(`${API_END_POINT}/evaluate/${id}`);
};
