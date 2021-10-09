import axios from "axios";

export const addNewStock = async (data) => {
  return await axios.post("/stock/create", data);
};

export const UpdateNewStock = async (id, data) => {
  return await axios.put(`/stock/update/${id}`, data);
};
export const DeleteStock = async (id) => {
  return await axios.delete(`/stock/${id}`);
};

export const SearchStock = async (data) => {
  return await axios.post(`/stock/searchname`, data);
};
