import { CloseOutlined } from "@ant-design/icons";
import { message } from "antd";
import "./index.css";

const showSuccess = (msg, duration = 3) => {
  message.success({
    content: (
      <div className="content">
        <div className="msg">{msg}</div>
        <div className="close-icon" onClick={() => message.destroy()}>
          <CloseOutlined style={{ color: "#70796c" }} />
        </div>
      </div>
    ),
    className: "standby-notice-success",
    duration,
    onClick: () => message.destroy(),
  });
};

const showError = (msg, duration = 3) => {
  message.error({
    content: (
      <div className="content">
        <div className="msg">{msg}</div>
        <div className="close-icon" onClick={() => message.destroy()}>
          <CloseOutlined style={{ color: "#70796c" }} />
        </div>
      </div>
    ),
    className: "standby-notice-error",
    duration,
    onClick: () => message.destroy(),
  });
};

export { showSuccess, showError };
