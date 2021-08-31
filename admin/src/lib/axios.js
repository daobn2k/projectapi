import Axios from 'axios';
import { notification } from 'antd';
import { history } from 'lib';

// import { API_URL } from '../config';
import { storage } from '../utils';

function authRequestInterceptor(config) {
  const token = storage.getToken();
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  config.headers.Accept = 'application/json';
  return config;
}

const axios = Axios.create({
  baseURL: 'http://127.0.0.1:8000/',
});

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (!error || !error.response) {
      return notification.error({
        message: 'Đã có lỗi xảy ra khi kết nối đến máy chủ. Vui lòng thử lại sau',
      });
    }
    if (error.response?.status === 401) {
      storage.clearAll();
      return history.push('/auth/login');
    }
    return Promise.reject(error?.response);
  }
);

export { axios };
