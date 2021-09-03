import React from 'react'
import InfoSection from '../../../components/home/InfoSection/InfoSection'
import ProductHot from '../../../components/home/listproduct/productHome'
import {Container} from '../../../globalStyled'
const HomePage = () => {

    return (
        <>
          <InfoSection/>  

        <Container style={{paddingTop:50}}>

          <ProductHot/>

        </Container>

        </>
    )
}

export default HomePage
