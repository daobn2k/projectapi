import axios from "axios";
import { API_END_POINT } from "../lib/axios";

export const createPayRoll = async(data) =>{
    return await axios.post(`${API_END_POINT}/payroll`, data);
}
export const updatePayRoll = async(id,data) =>{
    return await axios.patch(`${API_END_POINT}/payroll/${id}`, data);
}

export const deletePayRoll = async(id) =>{
    return await axios.delete(`${API_END_POINT}/payroll/${id}`);
}
  
export const searchPayRoll = async(data) =>{
    return await axios.post(`${API_END_POINT}/payroll/searchname`,data)
}

export const getDataCreatePayRoll = async(data) => {
  return await axios.post(`${API_END_POINT}/timesheets/payroll`,data)
}