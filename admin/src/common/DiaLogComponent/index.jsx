import { Modal } from "antd";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import PropTypes from "prop-types";

const DialogComponent = (props, ref) => {
  const { title, content, style, footer, className, showPopup } = props;

  const [visible, setVisible] = useState(false);
  const onVisible = () => {
    setVisible(!visible);
  };

  const onCloseP = () => {
    setVisible(false);
  };
  // ref for action dialog
  useImperativeHandle(
    ref,
    () => ({
      onVisible,
      onCloseP,
      visible,
    }),
    []
  );
  return (
    <div className="dialog-component">
      <div onClick={onVisible} className="div-child">
        {showPopup()}
      </div>
      <Modal
        title={title}
        style={style}
        footer={footer}
        className={`${className} dialog-common`}
        visible={visible}
        closable={true}
        onCancel={onVisible}
        destroyOnClose={onVisible}
      >
        {content()}
      </Modal>
    </div>
  );
};
export default forwardRef(DialogComponent);

DialogComponent.propTypes = {
  title: PropTypes.string,
  content: PropTypes.node | PropTypes.func,
  footer: PropTypes.node,
  className: PropTypes.string,
  showPopup: PropTypes.func | PropTypes.node,
};
