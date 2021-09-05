import React from 'react'
import './detailproduct.css'
import { Card , Button, Col , Row } from 'antd';

export default function DetailProduct() {
    return (
<>
<body className="container">

<div className="site-card-border-less-wrapper">
  <Card  bordered={false} style={{ width: 1000 }}
    cover={<img alt="example" src="https://mbaauto.vn/wp-content/uploads/2019/12/Mercedes-S450-Luxury-2020-mbaauto-1-min.jpg" />}
 >
    </Card>
  </div>
    <div className="content-detail">
        <h1> XE MERCEDES S450</h1>
        <p>Giá : 7.800.000 VNĐ</p>
        <p>Mercedes-Maybach S 450 là bản facelift có nhiều nâng cấp từ ngoại nội thất, động cơ đến công nghệ nhằm hướng tới một chiếc “xế hộp” siêu sang và tiện nghi hàng đầu. Nhìn tổng quan, xe là sự hòa quyện giữa giá trị truyền thống và cảm hứng đương đại đặc trưng mà Mercedes-Maybach theo đuổi. Mercedes-Maybach S 450 là sự lựa chọn lý tưởng để thể hiện đẳng cấp và vị thế cá nhân – phong cách của những ông chủ lớn </p>
        <div className="btn"><Button >ADD TO CART</Button></div>              
    </div>

        <h1 className="text">Sản phẩm liên quan</h1>


<div className="site-card-wrapper">
    <Row gutter={16}>
      <Col span={8}>
        <Card title="Xe mercedes c200" bordered={false}
        cover={<img alt="example" src="https://mbaauto.vn/wp-content/uploads/2019/12/Mercedes-S450-Luxury-2020-mbaauto-1-min.jpg" />}
        >
        <Button>Chi tiết sản phẩm</Button>
        </Card>
      </Col>
      <Col span={8}>
      <Card title="Xe maybach s450" bordered={false} 
        cover={<img alt="example" src="https://muaxegiatot.vn/wp-content/uploads/2019/04/den-xe-maybach-s450-4matic-2019-muaxegiatot-vn.jpg" />}
        >
        <Button>Chi tiết sản phẩm</Button>
        </Card>
      </Col>
      <Col span={8}>
      <Card title="Xe mercedes c300" bordered={false}
        cover={<img alt="example" src="https://i-vnexpress.vnecdn.net/2019/08/26/danh-gia-mercedes-c300-amg-tai-viet-nam-1566791022.jpg" />}
        >
        <Button>Chi tiết sản phẩm</Button>
        </Card>
      </Col>
    </Row>
  </div>

</body>
</>

    )
}
