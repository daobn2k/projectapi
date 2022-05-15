import React from 'react';
import { Popconfirm } from 'antd';

const PopupConfirmComponent = (props) => {
    const { title , children ,data ,handleDelete} = props

    const confirm = () => {
        handleDelete(data._id)
    }

    const cancel = () => {}
    return (
        <Popconfirm
            title={`Bạn có đồng ý xóa ${title} này không ?`}
            onConfirm={confirm}
            onCancel={cancel}
            okText="Đồng ý"
            cancelText="Hủy"
        >
            {children}
        </Popconfirm>
    );
};

export default PopupConfirmComponent;
