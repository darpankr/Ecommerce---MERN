import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';
import { toast } from 'react-hot-toast';
const Cart = () => {
    const navigate = useNavigate();
    const { cart, fetchCart, addToCart, updateToCart, totalAmount, moveToBagbyCart } = useCartStore();
    useEffect(() => {
        fetchCart();
    }, [fetchCart])
    const handleIncrement = (productId) => {
        addToCart(productId, 1);
    }
    const handleDecrement = (productId) => {
        updateToCart(productId);
    }
    const handleMoveToBag = async () => {
        try {
            await moveToBagbyCart();
            toast.success("Items moved to bag!");
        } catch (error) {
            toast.error("Failed to move items to bag");
            console.error(error);
        }
    };
    // console.log(totalAmount)
    return (
        <div className='flex flex-col justify-center items-center '>
            <div>YOUR CART</div>
            <div className=' mt-6 shadow-red-500 shadow-sm p-2'>
                {cart.length === 0 ? (
                    <p>Your Cart is empty</p>
                ) : (

                    <div className='space-y-4'>
                        {cart.map((item) => (
                            <div key={item.id} className='flex flex-col justify-center shadow-gray-400 shadow-sm p-2'>
                                <h3>{item.Product.name}</h3>
                                <div className='flex justify-between items-center gap-2'>
                                    <p>Price: {item.Product.price}</p>
                                    <p>Quantity: {item.quantity}</p>
                                    <div className='flex justify-center items-center gap-1'>
                                        <button
                                            className='bg-green-500 rounded-full size-7 font-bold hover:cursor-pointer'
                                            onClick={() => handleIncrement(item.Product.id)}
                                        >+</button>
                                        <button
                                            className='bg-red-500 rounded-full size-7 font-bold hover:cursor-pointer'
                                            onClick={() => handleDecrement(item.Product.id)}
                                        >-</button>
                                        {/* <button>-</button> */}
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className='flex justify-center items-center gap-4'>
                            <p>Amount: {totalAmount}</p>
                            <button
                                className='py-1 px-2 bg-orange-600 text-white font-medium rounded-sm hover:cursor-pointer'
                                onClick={async () => {
                                    await handleMoveToBag();
                                    navigate('/bag')
                                }}
                            >
                                Add to Bag
                            </button>
                        </div>
                    </div>
                )}

            </div>

        </div>
    )
}

export default Cart
