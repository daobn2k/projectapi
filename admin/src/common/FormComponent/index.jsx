import React, { useEffect } from "react";
import { DatePicker, Form, Input } from "antd";
import SelectComponent from "../../common/SelectComponent";
import "./style.css";
import moment from "moment";

const FormComponent = (props) => {
  const { form, className, name, fileds, actionHandler, data } = props;

  const renderFiledItem = (type, config) => {
    switch (type) {
      case "input":
        return <Input maxLength={256} {...config} />;
      case "ipassword":
        return <Input.Password maxLength={256} {...config} />;
      case "date":
        return <DatePicker {...config} />;
      case "area":
        return <Input.TextArea maxLength={4000} {...config} />;
      case "select":
        return <SelectComponent {...config} />;
      default:
        return;
    }
  };
  const onFinish = (v) => {
    let dataForm;
    if (data) {
      dataForm = {
        ...v,
        id: data._id,
      };
    } else {
      dataForm = v;
    }
    return actionHandler(dataForm);
  };

  useEffect(() => {
    if (data) {
      fileds.forEach((ele) => {
        const { typeFiled: type } = ele;
        const { name } = ele.itemForm;
        if (typeof data[name] === "object" && type === "select") {
          const valueSet = {
            [name]: data[name] && data[name]._id ? data[name]._id : "",
          };
          return form.setFieldsValue(valueSet);
        }
        if (type === "date") {
          const valueSet = {
            [name]:
              data && data[name] ? moment(data[name]).format("DD/MM/YYYY") : "",
          };
          return form.setFieldsValue(valueSet);
        }
        if (type === "input" || type === "area") {
          const valueSet = {
            [name]: data && data[name] ? data[name] : "",
          };
          return form.setFieldsValue(valueSet);
        }
      });
    }
  }, [data]);
  return (
    <Form
      form={form}
      name={name}
      className={`form ${className}`}
      onFinish={onFinish}
      autoComplete="off"
    >
      {fileds.map((item, index) => {
        const { itemForm, filed, typeFiled } = item;
        return (
          <Form.Item {...itemForm} key={index} className="form-item-component">
            {renderFiledItem(typeFiled, filed)}
          </Form.Item>
        );
      })}
    </Form>
  );
};

export default FormComponent;
