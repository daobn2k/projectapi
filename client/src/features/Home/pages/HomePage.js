import React from "react";

import ListInfo from "../../../components/home/Info/list/list";
import InfoSection from "../../../components/home/InfoSection/InfoSection";
import ListCategory from "../../../components/home/listproduct/listcategory/listcategory";
import ProductFavorite from "../../../components/home/listproduct/productFavorite/productHome";
import ProductHot from "../../../components/home/listproduct/productHot/productHome";
import ProductView from "../../../components/home/listproduct/productView/productView";
import { Container } from "../../../globalStyled";

const HomePage = ({
  productData,
  categoryData,
  getListCart,
  getFavorite,
  currentListFavorite,
}) => {
  return (
    <>
      <InfoSection />
      <ListInfo />
      <Container style={{ paddingTop: 50 }}>
        <ProductFavorite
          productData={productData}
          getListCart={getListCart}
          getFavorite={getFavorite}
          currentListFavorite={currentListFavorite}
        />
        <ProductHot
          productData={productData}
          getListCart={getListCart}
          getFavorite={getFavorite}
          currentListFavorite={currentListFavorite}
        />
        <ProductView
          productData={productData}
          categoryData={categoryData}
          getListCart={getListCart}
          getFavorite={getFavorite}
          currentListFavorite={currentListFavorite}
        />
      </Container>
      <ListCategory />
    </>
  );
};

export default HomePage;
