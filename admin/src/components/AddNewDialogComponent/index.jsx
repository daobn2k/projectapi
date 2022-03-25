import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Form, Button } from "antd";
import DiaLogComponent from "../../common/DiaLogComponent";
import { PlusOutlined } from "@ant-design/icons";
import "./style.css";
import FormComponent from "../../common/FormComponent";

const AddNewDialogComponent = (props, ref) => {
  const { title, fileds, onSubmit } = props;
  const [form] = Form.useForm();
  const [data, setData] = useState();
  const refDialog = useRef();

  const clearData = () => {
    form.resetFields();
    refDialog.current.onVisible();
    refDialog.current.onCloseP();
    setData({});
  };

  const showEdit = (data) => {
    refDialog.current.onVisible();
    setData(data);
  };

  useImperativeHandle(
    ref,
    () => ({
      clearData,
      refDialog,
      showEdit,
    }),
    []
  );
  return (
    <DiaLogComponent
      title={`${data ? "Chỉnh sửa " : "Tạo mới "}` + title}
      ref={refDialog}
      content={() => {
        return (
          <FormComponent
            form={form}
            name="my-form"
            fileds={fileds}
            actionHandler={onSubmit}
            data={data}
          />
        );
      }}
      showPopup={() => {
        return (
          <Button className="btn-add" icon={<PlusOutlined />}>
            Thêm mới {title}
          </Button>
        );
      }}
      footer={[
        <div>
          <Button onClick={clearData} htmlType="button">
            Hủy bỏ
          </Button>
          <Button htmlType="submit" form="my-form" key="submit" type="primary">
            Lưu
          </Button>
        </div>,
      ]}
    />
  );
};

export default forwardRef(AddNewDialogComponent);
