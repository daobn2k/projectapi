import { Image, notification, Space, Table,  Button, Tag ,Input, Spin} from "antd";
import React, { useEffect, useState } from "react";
import { AiOutlineEdit, AiFillDelete } from "react-icons/ai";
import { GetProduct } from "../../axios";
import { DeleteProduct, SearchProduct } from "../../axios/product";
import { Link, useHistory } from "react-router-dom";
import { PlusOutlined ,LoadingOutlined} from "@ant-design/icons";


const { Search } = Input;
export default function ListProduct() {
  const history = useHistory();
  const [loading,setLoading] = useState(false)
  const columns = [
    {
      title: "Name",
      dataIndex: "product_name",
      render: (e, item) => (
        <a
          style={{ color: "#404040" }}
          key={item.id}
          href={`/product/detail?${item.id}`}
        >
          {" "}
          {e}
        </a>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      render: (e) => (
        <a
          style={{ color: "#404040" }}
          key={e.id}
          href={`/product/detail?${e.id}`}
        >
          {" "}
          {e.name}
        </a>
      ),
    },
    {
      title: "Image",
      dataIndex: "product_image",
      render: (e) => {
        return <Image key={e.id} width={50} src={e} />;
      },
    },
    {
      title: "Description",
      dataIndex: "product_description",
      key: "description",
    },
    {
      title: "Price",
      dataIndex: "product_price",
      key: "price",
    },
    {
      title: "Quantity",
      dataIndex: "product_quantity",
      key: "quantity",
    },
    {
      title: "Status",
      key: "product_hot",
      dataIndex: "product_hot",
      render: (product_hot) => (
        <Tag
          color={
            product_hot === 0 ? "cyan" : product_hot === 1 ? " magenta" : "blue"
          }
        >
          {product_hot === 0
            ? "Normal"
            : product_hot === 1
            ? " Favorite"
            : "Hot"}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (e) => (
        <Space size="middle">
          <AiOutlineEdit key={e.id} onClick={() => handleEdit(e.id)} />
          <AiFillDelete key={e.id} onClick={() => handleDelete(e.id)} />
        </Space>
      ),
    },
  ];
  const [currentData, setCurrentData] = useState([]);

  const LoadingProduct = () =>{
    GetProduct()
    .then((res) => {
      setCurrentData(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }
  useEffect(() => {
    LoadingProduct()
  }, []);

  const handleDelete = (id) => {
    setLoading(true)
    DeleteProduct(id)
      .then((res) => {
        notification.success({
          message: `Notification Delete`,
          description: "Delete Product SuccessFully !",
          placement: "topRight ",
        });
        setLoading(false)
        setTimeout(
          LoadingProduct()
        ,3000)
      })
      .catch((err) => {
        notification.error({
          message: `Notification Delete`,
          description: "Delete Product Failed !",
          placement: "topRight ",
        });
        setLoading(false)
      });
  };

  const handleEdit = (id) => {
    history.push({
      pathname: `/product/add`,
      search: "?" + new URLSearchParams({ product_id: id }).toString(),
    });
  };


  const handleSearch = (e) => {
    SearchProduct({key:e})
    .then(res => setCurrentData(res.data))
    .catch(err => console.log(err))
  }

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  return (
    <Spin indicator={antIcon} spinning={loading}>
    <Space size={14} className="Space">
      <div className="top-table">
        <Search
          allowClear 
          placeholder="Search to Select"
          optionFilterProp="children"
          className="input-search"
          onSearch={handleSearch}
          enterButton 
        >
        </Search>
        <Link to="/product/add">
        <Button  className="btn-add" icon={<PlusOutlined />}>
          Thêm Mới Sản Phẩm
        </Button>
        </Link>
      </div>
      <Table columns={columns} dataSource={currentData} />
    </Space>
   </Spin>
  );
}
