import React from 'react'
import './detailproduct.css'
import { Card , Button, Image } from 'antd';

export default function DetailProduct() {
    return (
<>
<body className="container">

<div className="site-card-border-less-wrapper">
  <Card  bordered={false}
  className="card-image"
    cover={<Image  src="https://mbaauto.vn/wp-content/uploads/2019/12/Mercedes-S450-Luxury-2020-mbaauto-1-min.jpg" />}
 >
    </Card>
    <div className="content-detail">
        <h1> XE MERCEDES S450</h1>
        <p>Giá : 7.800.000 VNĐ</p>
        <p>Mercedes-Maybach S 450 là bản facelift có nhiều nâng cấp từ ngoại nội thất, động cơ đến công nghệ nhằm hướng tới một chiếc “xế hộp” siêu sang và tiện nghi hàng đầu. Nhìn tổng quan, xe là sự hòa quyện giữa giá trị truyền thống và cảm hứng đương đại đặc trưng mà Mercedes-Maybach theo đuổi. Mercedes-Maybach S 450 là sự lựa chọn lý tưởng để thể hiện đẳng cấp và vị thế cá nhân – phong cách của những ông chủ lớn </p>
        <div className="btn-container"><Button className="btn">ADD TO CART</Button></div>              
    </div>
</div>

        <h1 className="text">Sản phẩm liên quan</h1>
<div className="site-card-wrapper">
    
</div>

</body>
</>

    )
}
