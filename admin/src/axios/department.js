import axios from 'axios';
import { API_END_POINT } from "../lib/axios";

export const getDataDeaprtment = (data) =>{
  return axios.get(`${API_END_POINT}/department`,{params:data});
}