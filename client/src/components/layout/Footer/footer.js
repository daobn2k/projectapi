
import React from 'react'
import { FooterCol, FooterInput, FooterItem, FooterList, FooterListIcon, FooterRow, FooterTitle } from './footer.element'
import {FacebookOutlined,SkypeOutlined,YoutubeOutlined,GoogleOutlined,SendOutlined} from '@ant-design/icons'
import {  Tooltip } from 'antd'
 
const FooterClient = () => {
  
    return (
        <FooterRow gutter={24}>
                <FooterCol span={6}>
                    <FooterTitle>Categories</FooterTitle>
                    <FooterList>
                        <FooterItem to="">Women</FooterItem>
                        <FooterItem to="">Men</FooterItem>
                        <FooterItem to="">Shoes</FooterItem>
                        <FooterItem to="">Watch</FooterItem>
                    </FooterList>
                </FooterCol>
                <FooterCol span={6}>
                    <FooterTitle>Help</FooterTitle>
                    <FooterList>
                        <FooterItem to="">Track Order</FooterItem>
                        <FooterItem to="">Returns</FooterItem>
                        <FooterItem to="">Shipping</FooterItem>
                       
                    </FooterList>
                </FooterCol>
                <FooterCol span={6}>
                    <FooterTitle>Get In Touch</FooterTitle>
                        <FooterItem to="">
                        Any questions? Let us know in store at 8th floor, 379 Hudson St, New York, NY 10018 or call us on (+1) 96 716 6879
                        </FooterItem>
                        <FooterListIcon>
                        <FacebookOutlined style={{color:"#b2b2b2",fontSize:16,marginRight:12}}/>
                        <SkypeOutlined style={{color:"#b2b2b2",fontSize:16,marginRight:12}}/>
                        <YoutubeOutlined style={{color:"#b2b2b2",fontSize:16,marginRight:12}}/>
                        <GoogleOutlined  style={{color:"#b2b2b2",fontSize:16,marginRight:12}}/>
                        
                        </FooterListIcon>
                
                       
                       
                
                </FooterCol>
                <FooterCol span={6}>
                    <FooterTitle>NewSletter</FooterTitle>
                    <FooterItem to="">
										Subscribe  to get latest news,update and information.
                    </FooterItem>
                    <FooterInput
                    placeholder="Enter your Email"
                    suffix={
                        <Tooltip title="Extra information">
                        <SendOutlined  style={{ color: 'rgba(0,0,0,.45)' }} />
                        </Tooltip>
                    }
                    />
                </FooterCol>
        </FooterRow>
    )
}

export default FooterClient
