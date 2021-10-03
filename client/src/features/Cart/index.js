import React from "react";
import Cart from "../../components/cart/cart";

export default function CartPage({ cartCurrent, getListCart }) {
  return (
    <>
      <Cart cartCurrent={cartCurrent} getListCart={getListCart} />
    </>
  );
}
