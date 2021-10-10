import React, { useState, useEffect } from "react";
import {
  Breadcrumb,
  Button,
  Input,
  Form,
  Select,
  InputNumber,
  DatePicker,
  notification,
} from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { getCategory, getStockById, GetUser } from "../../axios";
import "./stock.css";
import { useParams } from "react-router";
import { SearchAccount } from "../../axios/account";
import { debounce } from "lodash";
import moment from "moment";
import { addNewStock, UpdateNewStock } from "../../axios/stock";

const { Option } = Select;

export default function AddStock() {
  const Status = [
    { id: 0, name: "Active" },
    { id: 1, name: "In Active" },
    { id: 2, name: "Inventory" },
  ];
  const stock_id = useParams();
  const [listEmployee, setListEmployee] = useState();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [category, setCategory] = useState();

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
  };

  useEffect(() => {
    getCategory()
      .then((res) => setCategory(res.data))
      .catch((err) => {});
    GetListEmployee();
    if (stock_id) {
      GetListStockWithId(stock_id.id);
    }
  }, []);
  const GetListEmployee = () => {
    GetUser()
      .then((res) => {
        const ListUserData = res.data.filter((e) => e.role !== "user");
        setListEmployee(ListUserData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const GetListStockWithId = (id) => {
    getStockById(id).then((res) => {
      form.setFieldsValue({
        stock_product: res.data.stock_product || "",
        stock_category_id: res.data.stock_category_id || "",
        stock_quantity: res.data.product_quantity || "",
        stock_purchaseprice: res.data.stock_purchaseprice || "",
        stock_date: moment(res.data.stock_date),
        status: res.data.status || "",
        employee_id: res.data.employee_id || "",
      });
    });
  };

  const searchTargets = (value) => {
    setLoading(true);
    SearchAccount({ key: value })
      .then((res) => {
        const listEmployee = res.data.filter((e) => e.role !== "user");
        setListEmployee(listEmployee);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);

        console.log(err);
      });
  };

  const handleSearchTargets = debounce(searchTargets, 800);

  const onFinish = (value) => {
    if (stock_id.id) {
      const dataUpdate = {
        ...value,
        stock_date: moment(value.stock_date).format("YYYY/MM/DD"),
      };
      UpdateNewStock(stock_id.id, dataUpdate)
        .then((res) => {
          notification.success({
            description: "updatee success fully",
            placement: "topRight",
            duration: 2,
          });
        })
        .catch((error) =>
          notification.error({
            description: "import failed ",
            placement: "topRight",
            duration: 2,
          })
        );
    } else {
      const data = {
        ...value,
        status: "1",
        stock_date: moment(value.stock_date).format("YYYY/MM/DD"),
      };
      addNewStock(data)
        .then((res) => {
          notification.success({
            description: "import success fully",
            placement: "topRight",
            duration: 2,
          });
        })
        .catch((error) =>
          notification.error({
            description: "import failed ",
            placement: "topRight",
            duration: 2,
          })
        );
    }
  };

  return (
    <div>
      <Breadcrumb separator=">" style={{ paddingBottom: 20 }}>
        <Breadcrumb.Item href="">
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item>Import</Breadcrumb.Item>
        <Breadcrumb.Item>
          {stock_id.id ? "Edit Import" : "Add New Import"}
        </Breadcrumb.Item>
      </Breadcrumb>
      <div className="FormAddProduct" style={{ display: "flex" }}>
        <Form
          form={form}
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
            hasFeedback={!stock_id.id ? true : false}
            name="employee_id"
            label="Employee"
          >
            <Select
              placeholder="Select Employee Create"
              size="large"
              className="select-item"
              showSearch
              onSearch={handleSearchTargets}
              filterOption={false}
              autoClearSearchValue
              dropdownClassName="select-dropdown"
              loading={loading}
            >
              {listEmployee &&
                listEmployee.length > 0 &&
                listEmployee.map((item, index) => {
                  return (
                    <Option
                      value={item.id}
                      key={index}
                      className="multile-item"
                    >
                      {item.name}
                    </Option>
                  );
                })}
            </Select>
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
            hasFeedback={!stock_id.id ? true : false}
            name="stock_product"
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
            name="stock_category_id"
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
            name="stock_quantity"
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
            name="stock_purchaseprice"
            rules={[
              {
                required: true,
                message: "Please input your price!",
              },
            ]}
            hasFeedback={!stock_id.id ? true : false}
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

          {stock_id.id && (
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
          )}
          <Form.Item name="stock_date" label="Date Import ">
            <DatePicker format="DD-MM-YYYY" />
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
