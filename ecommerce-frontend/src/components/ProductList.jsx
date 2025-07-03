import React, { useEffect, useState } from 'react'
import API from '../api/api'
import { useProductStore } from '../store/useProductStore';
import { useCartStore } from '../store/useCartStore';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStote'

const ProductList = () => {

    const { products, fetchProducts } = useProductStore();
    const { addToCart, fetchCart } = useCartStore();
    const [addCart, setAddCart] = useState(null);

    const navigate = useNavigate();
    const { user } = useAuthStore();

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts])

    const addProductToCart = async (productId) => {
        if (!user) {
            navigate('/login', { state: { from: window.location.pathname } });
            return;
        }
        try {
            setAddCart(productId);
            await addToCart(productId, 1);
            await fetchCart();
            console.log("added to cart")
        } catch (error) {
            console.error("Add to cart error:", error.response?.data || error.message);
        } finally {
            setAddCart(null);
        }
    }
    return (
        <div className='bg-white text-black flex flex-col justify-center items-center'>
            <h1 className='text-black'>PRODUCTS</h1>
            <div className='space-y-4 my-6'>
                {products.map((data) => (
                    <div key={data.id} className='shadow-red-500 shadow-sm flex justify-between items-center px-2 gap-2'>
                        <div>
                            <h3>Name: {data.name}</h3>
                            <p>Description: {data.description}</p>
                            <p>Price: {data.price}</p>
                        </div>
                        <div>
                            <button
                                className='px-2 py-1 bg-green-500 rounded-sm hover:cursor-pointer'
                                onClick={() => addProductToCart(data.id)}
                            >
                                {addCart === data.id ? "Adding..." : "Add Item"}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProductList
