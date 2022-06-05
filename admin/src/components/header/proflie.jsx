import {
  Avatar,
  Button,
  Col,
  Image,
  Modal,
  notification,
  Space,
  Typography,
} from "antd";
import React, { useRef, useState } from "react";
import { store } from "../../storage";
import DeatailProfile from "./deatail";
import { EditOutlined } from "@ant-design/icons";
import "./header.css";
import ChangePassword from "./password";
import { UpdateAccount, changePassword } from "../../axios/account";
import { getUserbyId } from "../../axios";
import { handleChangeGetFile } from "../../shared";

const TYPECHANGE = [
  { type: "INFO", title: "Thông tin cá nhân", image: "/image/User.png" },
  {
    type: "PASSWORD",
    title: "Thay đổi mật khẩu",
    image: "/image/LockSimple.png",
  },
  { type: "CONTACT", title: "Thông tin liên lạc", image: "/image/Phone.png" },
];
export default function Profile({ isProfileVisible, handleCancel }) {
  const [type, setType] = useState("INFO");
  const [isEdit, setIsEdit] = useState(true);
  const user = store.getCurentUser();
  const upRef = useRef()
  const [userInfo, setUserInfo] = useState();

  const [url,setUrl] = useState(user.avatar)

  React.useEffect(() => {
    if (user) {
      loadingInfo(user._id);
    }
  }, []);

  const loadingInfo = (id) => {
    getUserbyId(id).then((res) => {
      setUserInfo(res.data.data)
      store.setCurrentUser(res.data.data);
    });
  };
  const editProfile = (values) => {
    UpdateAccount(user._id, {...values,avatar:url})
      .then((res) => {
        notification.success({
          description: "Chỉnh sửa thông tin cá nhân thành công",
          placement: "topRight",
        });
        loadingInfo(user._id);
        setIsEdit(true);
      })
      .catch((err) => {
        notification.error({
          description: "Chỉnh sửa thất bại",
          placement: "topRight",
        });
        setIsEdit(true);
      });
  };

  const editPassword = (data) => {
    changePassword({...data,id:user._id})
      .then((res) => {
        const { data = {} } = res
        const { status ,message , error}  = data
        if(status === 200 && message === "SUCCESS"){
         return  notification.success({
            description: "Thay đổi mật khẩu thành công",
            placement: "topRight",
          });
        }
        notification.error({
          description: error,
          placement: "topRight",
        });
      })
      .catch((err) => {
        notification.error({
          description: "Đã có lỗi xảy ra",
          placement: "topRight",
        });
      })
      .finally(()=>{
        loadingInfo(user._id);
        setIsEdit(true);
      })
  };
  const onCancel = () => {
    setIsEdit(true);
  };

  
  const handleChange = async (e) => {
     await handleChangeGetFile(e,setUrl)
  }

  return (
    <Modal
      width={1265}  
      zIndex={700}
      visible={isProfileVisible}
      footer={null}
      closable={false}
      onCancel={handleCancel}
      className="ModalProfile"
      centered
      title={
        <div className="header-model">
          <Typography.Title className="header-title">Thông tin cá nhân</Typography.Title>
          {isEdit && (
            <Button
              className="header-button"
              icon={<EditOutlined />}
              onClick={() => setIsEdit(false)}
            >
              Chỉnh sửa
            </Button>
          )}
        </div>
      }
    >
      <Col span={6} style={{ marginRight: 24 }} className="col-6">
        <Avatar size={88} src={url ? url : ''} />
        <div style={{ marginTop:12 }} onClick={()=> !isEdit ? upRef.current.click()  : false}>
        <input name="upload" type="file" onChange={handleChange} style={{display:'none'}} ref={upRef}></input>
          <EditOutlined />
        </div>
        <Typography.Title className="title">
          {userInfo && userInfo.name}
        </Typography.Title>
        <Space size={16} direction="vertical" className="space-profile">
          {TYPECHANGE.map((e, index) => {
            return (
              <React.Fragment>
                <Button
                  className="btn_profile"
                  style={{
                    background: e.type === "INFO" ? "#036B59" : "",
                    color: e.type === "INFO" ? "#ffffff" : "",
                  }}
                  key={index}
                  onClick={() => setType(e.type)}
                >
                  <Image src={e.image} preview={false} />
                  {e.title}
                </Button>
              </React.Fragment>
            );
          })}
        </Space>
      </Col>
      <Col span={18} style={{ flex: 1 }} className="col-18">
        {type === "INFO" && (
          <DeatailProfile
            userInfo={userInfo}
            isEdit={isEdit}
            editProfile={editProfile}
            onCancel={onCancel}
          />
        )}
        {type === "PASSWORD" && (
          <ChangePassword
            userInfo={userInfo}
            isEdit={isEdit}
            onCancel={onCancel}
            editPassword={editPassword}
          />
        )}
        {/* {type === "CONTACT" && <DeatailProfile />} */}
      </Col>
    </Modal>
  );
}
