import React from 'react'
import ProductList from '../components/ProductList'
import Cart from '../components/Cart'

const Products = () => {
    return (
        <div className='flex justify-center items-start gap-8'>
            <ProductList />
            <Cart />
        </div>
    )
}

export default Products
