import axios from "axios";

const profileUpdate = async (data) => {
  //   return await axios.post(`/user/searchname`, data);
};

const deleteFavorite = async (id) => {
  console.log(id);
  return await axios.delete(`/favorite/${id}`);
};
export { profileUpdate, deleteFavorite };
