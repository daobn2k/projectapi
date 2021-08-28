import React from 'react'
import { Route } from 'react-router-dom'

import listProduct from '../../components/product/listproduct'
export default function productPage() {
    return (
        <>
           <Route path="/product" component ={listProduct} />
        </>
    )
}
