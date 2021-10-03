import React from "react";
import { Route } from "react-router-dom";
import DetailProduct from "../../components/product/detailproduct";
import ListProduct from "../../components/product/listproduct";
export default function ProductPage({
  productData,
  categoryData,
  getListCart,
}) {
  return (
    <>
      <Route path="/product" exact>
        <ListProduct
          productData={productData}
          categoryData={categoryData}
          getListCart={getListCart}
        />
      </Route>
      <Route path="/product/:id" exact>
        <DetailProduct getListCart={getListCart} />
      </Route>
    </>
  );
}
