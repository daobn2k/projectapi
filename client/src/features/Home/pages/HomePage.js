import React,{ useEffect } from 'react'
import ListInfo from '../../../components/home/Info/list/list'
import InfoSection from '../../../components/home/InfoSection/InfoSection'
import ListCategory from '../../../components/home/listproduct/listcategory/listcategory'
import ProductHot from '../../../components/home/listproduct/productHot/productHome'
import ProductView from '../../../components/home/listproduct/productView/productView'
import { Container } from '../../../globalStyled'

const HomePage = () => {
    useEffect(() => {
    },)
  return (
    <>
      <InfoSection />
      <ListInfo />
            <Container style={{ paddingTop: 50 }}>
              <ProductHot />
              <ProductView />
            </Container>
      <ListCategory />
    </>
  )
}

export default HomePage
