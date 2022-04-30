import axios from "axios";
import { API_END_POINT } from "../lib/axios";

export const checkInWork = async ( data ) => {
    return await axios.post(`${API_END_POINT}/timesheets`, data);
};

export const createTimeSheet = async(data) =>{
    return await axios.post(`${API_END_POINT}/timesheets`, data);
}
export const updateTimeSheet = async(id,data) =>{
    return await axios.patch(`${API_END_POINT}/timesheets/${id}`, data);
}

export const deleteTimeSheet = async(id) =>{
    return await axios.delete(`${API_END_POINT}/timesheets/${id}`);
  }
  
export const searchTimeSheet = async(data) =>{
    return await axios.post(`${API_END_POINT}/timesheets/searchname`,data)
  }