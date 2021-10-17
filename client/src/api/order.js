import axios from "axios";

const UpdateNewOrder = async (id, data) => {
  return await axios.put(`/orderupdate/${id}`, data);
};
const DeleteOrder = async (id) => {
  return await axios.delete(`/orderdelete/${id}`);
};

const SearchOrder = async (data) => {
  return await axios.post(`/order/filterdate`, data);
};

export { DeleteOrder, UpdateNewOrder, SearchOrder };
