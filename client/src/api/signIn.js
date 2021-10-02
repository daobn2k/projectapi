import axios from "axios";

const addNewAccount = async (data) => {
  return await axios.post("/user/adduserfromadmin", data);
};

const UpdateAccount = async (id, data) => {
  return await axios.put(`/user/${id}`, data);
};

const DeleteAccount = async (id) => {
  return await axios.delete(`/user/${id}`);
};

const SearchAccount = async (data) => {
  return await axios.post(`/user/searchname`, data);
};

export { addNewAccount, DeleteAccount, UpdateAccount, SearchAccount };
