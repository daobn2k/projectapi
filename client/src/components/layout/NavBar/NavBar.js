// eslint-disable-next-line react-hooks/exhaustive-deps

import { Avatar, Badge, Button, notification } from "antd";
import React, { useState } from "react";
import MiniCart from "../../cart/miniCart";
import ModalClientForm from "../../Modal";
import { addNewAccount, Login } from "../../../api";
import { storage } from "../../../comon/storage";
import {
  Nav,
  NavbarContainer,
  NavLogo,
  NavIcon,
  NavMenu,
  NavItem,
  NavLinks,
  IconShoppingCart,
  IconHeart,
  IconSettingUser,
  NavMenuIcon,
} from "./NavBar.element";
import moment from "moment";
import { showError, showSuccess } from "../Message/showMessage";
import ModalProfileForm from "./profile";
import ListFavorite from "./ListFavorite";

const listMenu = [
  { id: 1, to: "/", title: "Home" },
  { id: 2, to: "/product", title: "Product" },
  { id: 3, to: "/cart", title: "Cart" },
  { id: 4, to: "/checkout", title: "Check Out" },
  { id: 5, to: "/contact", title: "Contact" },
];

const NavBar = ({ cartCurrent, currentListFavorite, getFavorite }) => {
  const [visible, setVisible] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [visibleProfile, setvisibleProfile] = useState(false);
  const [navbar, setNavbar] = useState(false);
  const [activeIndex, setActiveIndex] = useState(1);
  const [isModalFavorite, setIsModalFavorite] = useState(false);

  const ChangeBackground = () => {
    if (window.scrollY >= 40) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };
  window.addEventListener("scroll", ChangeBackground);

  function chooseValue(item) {
    setActiveIndex(item.id);
  }

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  const handleClickModal = () => {
    setVisibleModal(true);
  };

  const showInfo = () => {
    setvisibleProfile(true);
  };

  const showFavoriteList = () => {
    setIsModalFavorite(true);
  };

  const onCancelFavorite = () => {
    setIsModalFavorite(false);
  };

  const userInfo = storage.getCurrentUser();

  const handleSignin = (valuesForm) => {
    if (valuesForm.accept) {
      const dataSubmit = {
        name: valuesForm.name,
        username: valuesForm.username,
        password: valuesForm.password,
        phone: valuesForm.phone,
        email: valuesForm.email,
        dob: moment(valuesForm.dob).format("DD/MM/YYYY"),
        role: "user",
        image: "",
        address: "",
      };
      addNewAccount(dataSubmit)
        .then((res) => {
          showSuccess("Sign in new account success. You can stared ");
          setVisibleModal(false);
        })
        .catch((err) => showError("Sign in new account failed"));
    }
  };
  const handleLogin = (valuesForm) => {
    Login(valuesForm)
      .then((res) => {
        storage.setCurrentUser(res.data);
        setVisibleModal(false);
      })
      .catch((err) =>
        notification.error({
          message: "Login failed please check your value input",
          placement: "topRight",
          duration: 2,
        })
      );
  };
  const onCancel = () => {
    setVisibleModal(false);
  };

  const onCancelProfile = () => setvisibleProfile(false);
  const CartQuantity =
    cartCurrent && cartCurrent.length
      ? cartCurrent
          ?.map((e) => {
            return e.product_quantity;
          })
          .reduce(
            (previousTotal = 0, currentQuantity) =>
              previousTotal + currentQuantity
          )
      : 0;
  return (
    <>
      <Nav
        style={{
          position: navbar ? "fixed" : "sticky",
          background: navbar ? "#fff" : "#F7F7F7",
          boxShadow: navbar ? "0 0px 3px 0px rgb(0 0 0 / 20%)" : "",
        }}
      >
        <NavbarContainer>
          <NavLogo>
            <NavIcon style={{ color: navbar ? "#666" : "#fff" }} />
            GOOD CAR
          </NavLogo>
          <NavMenu>
            {listMenu.map((e, index) => {
              return (
                <NavItem key={index} onClick={() => chooseValue(e)}>
                  <NavLinks
                    to={e.to}
                    style={{
                      color: activeIndex === e.id ? "#333" : "#888",
                      borderBottom:
                        activeIndex === e.id ? "1px solid transparent" : "",
                      borderColor: activeIndex === e.id ? "#797979" : "",
                    }}
                  >
                    {e.title}
                  </NavLinks>
                </NavItem>
              );
            })}
          </NavMenu>
          <NavMenuIcon>
            <NavItem>
              <NavLinks to="/">
                <Badge
                  size="large"
                  count={CartQuantity}
                  style={{ top: "-2px", right: "-5px" }}
                >
                  <IconShoppingCart onClick={showDrawer} />
                </Badge>
              </NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks to="/">
                <Badge
                  size="large"
                  count={currentListFavorite?.product?.length}
                  style={{ top: "-2px", right: "-5px" }}
                >
                  <IconHeart
                    style={{ color: "#404040" }}
                    onClick={showFavoriteList}
                  />
                </Badge>
              </NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks to="/">
                <IconSettingUser style={{ color: "#404040" }} />
              </NavLinks>
            </NavItem>

            <NavItem>
              {storage.getCurrentUser() ? (
                // Avatar
                <Avatar
                  size={40}
                  src={storage.getCurrentUser().image}
                  onClick={showInfo}
                />
              ) : (
                <Button
                  style={{
                    fontSize: 16,
                    marginLeft: 10,
                    height: "36px",
                    padding: "0px 20px",
                    textTransform: "uppercase",
                    boxShadow: "0px 0px 5px #0000000a",
                    display: "flex",
                    alignItems: "center",
                    borderRadius: "4px",
                    border: "navajowhite",
                  }}
                  type="primary"
                  onClick={handleClickModal}
                >
                  Sign In
                </Button>
              )}
            </NavItem>
          </NavMenuIcon>
        </NavbarContainer>
        <MiniCart
          visible={visible}
          onClose={onClose}
          cartCurrent={cartCurrent}
        />
      </Nav>
      <ModalClientForm
        visibleModal={visibleModal}
        handleLogin={handleLogin}
        onCancel={onCancel}
        handleSignin={handleSignin}
      />
      <ModalProfileForm
        visibleProfile={visibleProfile}
        userInfo={userInfo}
        onCancel={onCancelProfile}
      />
      <ListFavorite
        currentListFavorite={currentListFavorite}
        isModalFavorite={isModalFavorite}
        onCancelFavorite={onCancelFavorite}
        getFavorite={getFavorite}
      />
    </>
  );
};

export default NavBar;
