import { Modal, Tabs } from 'antd'
import React from 'react'
import './index.css'
import ModalLogin from './Login/ModalLogin'
import ModalSignIn from './SignIn'


export default function ModalClientForm({visibleModal,handleLogin,onCancel,handleSignin}) {
    return (
        <Modal visible={visibleModal} footer={false} onCancel={onCancel}> 
        <Tabs>
            <Tabs.TabPane tab="Login" key="1">
            <ModalLogin handleLogin={handleLogin} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Sign Up" key="2">
                <ModalSignIn handleSignin={handleSignin}/>
            </Tabs.TabPane>
        </Tabs>
        </Modal>
    )
}
