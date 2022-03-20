import axios from 'axios';
import { API_END_POINT } from "../lib/axios";

export const getDataEducation = (data) =>{
  return axios.get(`${API_END_POINT}/education`,{params:data});
}