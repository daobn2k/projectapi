import {
  Button,
  Input,
  InputNumber,
  Form,
  Select,
  Image,
  notification,
  Breadcrumb,
} from "antd";
import queryString from "query-string";
import "./product.css";
import React, { useEffect, useState } from "react";
import { getCategory, getProductbyId, getStock } from "../../axios";
import { addNewProduct, UpdateNewProduct } from "../../axios/product";
import { storage } from "../../firebase";
import { useLocation, useHistory } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";

export default function AddProduct() {
  const history = useHistory();
  const [stock, setListStock] = useState();
  const [form] = Form.useForm();
  const [category, setCategory] = useState();
  const [currentData, setCurrentData] = useState({});
  const location = useLocation();
  const query = queryString.parse(location.search);
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
  };
  useEffect(() => {
    LoadingStock();
    getCategory()
      .then((res) => setCategory(res.data))
      .catch((err) => {});
    if (query.product_id) {
      getProductbyId(query.product_id)
        .then((res) => {
          setCurrentData(res.data);
        })
        .catch((err) => {});
    }
  }, [query.product_id]);
  const data = [
    { id: 0, name: "Normal" },
    { id: 1, name: "Hot" },
    { id: 2, name: " Favorite" },
  ];
  const handleChange = (e) => {
    if (e.target.files[0]) {
      const upLoadTask = storage
        .ref(`images/${e.target.files[0].name}`)
        .put(e.target.files[0]);
      upLoadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          notification.error({
            message: `Notification`,
            description: "  Upload Image Failed",
            placement: "topRight",
          });
        },
        () => {
          storage
            .ref("images")
            .child(e.target.files[0].name)
            .getDownloadURL()
            .then((url) => {
              setCurrentData({ ...currentData, product_image: url });
            });
        }
      );
    }
  };

  const onFinish = () => {
    if (query.product_id) {
      UpdateNewProduct(query.product_id, currentData)
        .then((res) => {
          notification.success({
            message: `Notification`,
            description: "  Update Product SuccessFully",
            placement: "topRight",
          });
          history.push({ pathname: "/product/list" });
        })
        .catch((err) => {
          notification.error({
            message: `Notification`,
            description: "  Update Product Failed",
            placement: "topRight",
          });
        });
    } else {
      addNewProduct(currentData)
        .then((res) => {
          history.push({
            pathname: "/product/list",
          });
        })
        .catch((error) => {
          notification.error({
            message: `Notification`,
            description: "  Created Product Failed",
            placement: "topRight",
          });
        });
    }
  };

  const LoadingStock = () => {
    getStock()
      .then((res) => {
        console.log(res.data);
        setListStock(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(stock);
  return (
    <div>
      <Breadcrumb separator=">" style={{ paddingBottom: 20 }}>
        <Breadcrumb.Item href="">
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item>Product</Breadcrumb.Item>
        <Breadcrumb.Item>
          {query.product_id ? "Edit Product" : "Add Product"}
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
          form={form}
          fields={[
            {
              name: ["name"],
              value: currentData ? currentData.product_name : "",
            },
            {
              name: ["category"],
              value: currentData ? currentData.category_id : "",
            },
            {
              name: ["quantity"],
              value: currentData ? currentData.product_quantity : "",
            },
            {
              name: ["price"],
              value: currentData ? currentData.product_price : "",
            },
            {
              name: ["description"],
              value: currentData ? currentData.product_description : "",
            },
            {
              name: ["hot"],
              value: currentData ? currentData.product_hot : "",
            },
          ]}
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
            <Select
              allowClear
              filterOption={false}
              style={{
                height: "40px",
                borderRadius: "4px",
                fontSize: 14,
                lineHeight: 22,
                cursor: "pointer",
              }}
              options={
                Array.isArray(stock) &&
                stock.length > 0 &&
                stock.map((o) => {
                  return {
                    id: o.stock_id,
                    value: o.stock_product,
                    label: o.stock_product,
                  };
                })
              }
              onChange={(e) =>
                setCurrentData({ ...currentData, product_name: e })
              }
            />
          </Form.Item>
          <Form.Item name="category" label="Category">
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
              onChange={(e) =>
                setCurrentData({ ...currentData, category_id: e })
              }
            ></Select>
          </Form.Item>
          <Form.Item name="quantity" label="Quantity">
            <InputNumber
              onChange={(e) =>
                setCurrentData({ ...currentData, product_quantity: e })
              }
              style={{ borderRadius: "4px", cursor: "pointer" }}
            />
          </Form.Item>
          <Form.Item
            name="price"
            onChange={(e) =>
              setCurrentData({ ...currentData, product_price: e.target.value })
            }
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
          <Form.Item
            name="description"
            label="Description"
            onChange={(e) =>
              setCurrentData({
                ...currentData,
                product_description: e.target.value,
              })
            }
            rules={[
              {
                required: true,
                message: "Please input your description!",
              },
            ]}
            hasFeedback
          >
            <Input.TextArea
              style={{ borderRadius: "4px", fontSize: 14, cursor: "pointer" }}
            />
          </Form.Item>
          <Form.Item
            name="hot"
            label="Favorite"
            onChange={(e) =>
              setCurrentData({ ...currentData, product_hot: e.target.value })
            }
          >
            <Select
              style={{
                height: "40px",
                borderRadius: "4px",
                fontSize: 14,
                lineHeight: 22,
                cursor: "pointer",
              }}
              options={data.map((o) => {
                return { id: o.id, value: o.id, label: o.name };
              })}
              onChange={(e) =>
                setCurrentData({ ...currentData, product_hot: e })
              }
            ></Select>
          </Form.Item>
          <Form.Item name="image" label="Image" valuePropName="image">
            <input name="upload" type="file" onChange={handleChange}></input>
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
        {currentData.product_image ? (
          <Image
            style={{
              width: "100%",
              height: "300px",
            }}
            src={currentData.product_image}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
