import React, { useState, useEffect } from "react";
import {
  Breadcrumb,
  Button,
  Input,
  Form,
  Select,
  InputNumber,
  DatePicker,
} from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { getCategory } from "../../axios";
import "./stock.css";

export default function AddStock() {
  const Status = [
    { id: 0, name: "Active" },
    { id: 1, name: "InActive" },
    { id: 2, name: "Inventory" },
  ];

  const [category, setCategory] = useState();

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
  };

  useEffect(() => {
    getCategory()
      .then((res) => setCategory(res.data))
      .catch((err) => {});
  }, []);

  const onFinish = () => {};

  return (
    <div>
      <Breadcrumb separator=">" style={{ paddingBottom: 20 }}>
        <Breadcrumb.Item href="">
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item>Product</Breadcrumb.Item>
        <Breadcrumb.Item>
          {/* {query.product_id ? "Edit Product" : "Add Product"} */}
        </Breadcrumb.Item>
      </Breadcrumb>
      <div className="FormAddProduct" style={{ display: "flex" }}>
        <Form
          {...layout}
          style={{
            width: "50%",
          }}
          name="nest-messages"
          onFinish={onFinish}
        >
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
            hasFeedback
            name="name"
            label="Name"
          >
            <Input
              style={{
                height: "40px",
                borderRadius: "4px",
                fontSize: 14,
                lineHeight: 22,
                cursor: "pointer",
              }}
            />
          </Form.Item>

          <Form.Item
            name="category"
            label="Category"
            rules={[
              {
                required: true,
                message: "Please select category!",
              },
            ]}
          >
            <Select
              style={{
                height: "40px",
                borderRadius: "4px",
                fontSize: 14,
                lineHeight: 22,
                cursor: "pointer",
              }}
              options={
                category &&
                category.map((o) => {
                  return { id: o.id, value: o.id, label: o.name };
                })
              }
            />
          </Form.Item>

          <Form.Item
            name="quantity"
            label="Quantity"
            rules={[
              {
                required: true,
                message: "Please input your quantity import!",
              },
            ]}
          >
            <InputNumber style={{ borderRadius: "4px", cursor: "pointer" }} />
          </Form.Item>

          <Form.Item
            name="price"
            rules={[
              {
                required: true,
                message: "Please input your price!",
              },
            ]}
            hasFeedback
            label="Price"
          >
            <Input
              style={{
                height: "40px",
                borderRadius: "4px",
                fontSize: 14,
                lineHeight: 22,
                cursor: "pointer",
              }}
            />
          </Form.Item>

          <Form.Item name="status" label="Status">
            <Select
              style={{
                height: "40px",
                borderRadius: "4px",
                fontSize: 14,
                lineHeight: 22,
                cursor: "pointer",
              }}
              options={Status.map((o) => {
                return { id: o.id, value: o.id, label: o.name };
              })}
            />
          </Form.Item>
          <Form.Item name="datepicker" label="Date of Birth">
            <DatePicker format="MM-DD-YYYY" />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                width: "100%",
                height: "40px",
                borderRadius: "4px",
                fontSize: "16px",
              }}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
