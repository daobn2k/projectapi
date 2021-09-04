import React from 'react'
import {  Drawer, Image, Space} from 'antd';
import { ButtonPayment, CartDetail, TextCart, TitleCart } from './NavBar.element';
export default function ProductCart({onClose,visible}) {
    const data = [
        {
            title: 'Xe Bentley',
            description: 'Bentley là thương hiệu xe đã có tuổi đời 100 năm thành lập và phát triển. Những chiếc xe thuộc thương hiệu này luôn tạo cho người dùng cảm giác của sự sang trọng và quý phái. Chính vì thế...',
            price: '307.0002',
            image: '/image/mecbenz.jpg',
            quantity:2,
            alt: 'Car'
        },

        {
            title: 'Xe Mercesdes',
            description: 'Bentley là thương hiệu xe đã có tuổi đời 100 năm thành lập và phát triển. Những chiếc xe thuộc thương hiệu này luôn tạo cho người dùng cảm giác của sự sang trọng và quý phái. Chính vì thế...',
            price: '307.0001',
            image: '/image/zero-take-t4yzxOtDZgQ-unsplash.jpg',
            quantity:3,
            alt: 'Car'
        },

        {
            title: 'Xe Bentley',
            description: 'Bentley là thương hiệu xe đã có tuổi đời 100 năm thành lập và phát triển. Những chiếc xe thuộc thương hiệu này luôn tạo cho người dùng cảm giác của sự sang trọng và quý phái. Chính vì thế...',
            price: '307.0003',
            quantity:1,
            image: '/image/bentley-mulsanne-4.jpg',
            alt: 'Car'
        },

        {
            title: 'Xe Bentley',
            description: 'Bentley là thương hiệu xe đã có tuổi đời 100 năm thành lập và phát triển. Những chiếc xe thuộc thương hiệu này luôn tạo cho người dùng cảm giác của sự sang trọng và quý phái. Chính vì thế...',
            price: '307.0003',
            image: '/image/bentley-mulsanne-4.jpg',
            quantity:2,
            alt: 'Car'
        },
    ]
    return (
        <>
          <Drawer width={400} title="Your Cart " placement="right" onClose={onClose} visible={visible}>
                    <Space direction="vertical" style={{width:'100%'}}>
                        {data.map((item,index)=>{
                            return(
                                <CartDetail key={index} >
                                <Image 
                                preview={false}
                                style={{width:100,height:100,marginRight:12,cursor:'pointer' }}
                                src={item.image}
                                />
                                <div style={{display:'flex',flexDirection:'column'}}>
                                <TitleCart>{item.title}</TitleCart>
                                <TextCart>{item.quantity} * {item.price}</TextCart>
                            
                                </div>
                                </CartDetail>            
                            )
                        })}  
                            <TitleCart style={{marginTop:20}}>Total: $75</TitleCart>
                        <div style={{display:'flex',width:'100%',justifyContent:'space-between'}}>
                            <ButtonPayment stlye={{marginRight:10}}>View Cart</ButtonPayment>
                            <ButtonPayment>Check Out</ButtonPayment>
                        </div>
                    </Space>
            </Drawer>   
        </>
    )
}
