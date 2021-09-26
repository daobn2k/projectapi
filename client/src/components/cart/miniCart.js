import React from 'react'
import {  Drawer, Image, Space} from 'antd';
import { ButtonPayment, CartDetail, TextCart, TitleCart } from '../layout/NavBar/NavBar.element';
export default function MiniCart({onClose,visible,cartCurrent}) {
    return (
        <>
          <Drawer width={450} title="Mini Cart Shopping " placement="right" onClose={onClose} visible={visible}>
                    <Space direction="vertical" style={{width:'100%'}} size={20}>
                        {cartCurrent.length && cartCurrent.map((item,index)=>{
                            return(
                                <CartDetail key={index} >
                                <Image 
                                preview={false}
                                style={{width:100,height:100,marginRight:12,cursor:'pointer' }}
                                src={item.product_image}
                                />
                                <div style={{display:'flex',flexDirection:'column'}}>
                                <TitleCart>{item.product_name}</TitleCart>
                                <TextCart>{item.product_quantity} * {item.product_price}</TextCart>
                            
                                </div>
                                </CartDetail>            
                            )
                        })}  
                            <TitleCart style={{marginTop:20}}>Total: $75</TitleCart>
                        <div style={{display:'flex',width:'100%',}} >
                            <ButtonPayment style={{marginRight:20}}>View Cart</ButtonPayment>
                            <ButtonPayment >Check Out</ButtonPayment>
                        </div>
                    </Space>
            </Drawer>   
        </>
    )
}
