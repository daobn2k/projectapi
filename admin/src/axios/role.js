import axios from 'axios';
import { API_END_POINT } from "../lib/axios";

export const getDataRole = (data) =>{
  return axios.get(`${API_END_POINT}/role`,{params:data});
}