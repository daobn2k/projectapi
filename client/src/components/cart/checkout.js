import { Modal } from "antd";
import "./checkout.css";
export const ModalCheckOut = ({ isVisiable, onCancel }) => {
  return (
    <Modal
      width={768}
      visible={isVisiable}
      footer={null}
      closable={false}
      onCancel={onCancel}
    />
  );
};
