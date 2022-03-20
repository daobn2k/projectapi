import axios from "axios";
import { API_END_POINT } from "../lib/axios";

const addRequest = async(data) =>{
  return await axios.post(`${API_END_POINT}/request`, data);
}

const updateRequest = async(id,data) =>{
  return await axios.patch(`${API_END_POINT}/request/${id}`, data);
}
const deleteRequest = async(id) =>{
  return await axios.delete(`${API_END_POINT}/request/${id}`);
}

const searchRequest = async(data) =>{
  return await axios.post(`${API_END_POINT}/request/searchname`,data)
}
export { addRequest ,updateRequest,deleteRequest,searchRequest};
