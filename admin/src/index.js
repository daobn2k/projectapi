import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ConfigProvider } from 'antd';
import vn from 'antd/lib/locale/vi_VN';
ReactDOM.render(
    <ConfigProvider locale={vn}>
    <App />
  </ConfigProvider>
, document.getElementById("root"));
