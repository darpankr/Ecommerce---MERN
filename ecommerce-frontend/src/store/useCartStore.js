import { create } from 'zustand';
import {addCart, getCart, moveToBag, updateCart} from '../api/cart'

export const useCartStore = create(
    (set) => ({
        cart: [],
        totalAmount: 0,
        loading: false,

        fetchCart: async () => {
            try {
                set({ loading: true });
                const res = await getCart();
                // console.log(res)
                set({
                    cart: res.data.cartItem || [],
                    totalAmount: res.data.totalAmount || 0,
                    loading: false
                });
            } catch (err) {
                console.error("Failed to fetch cart", err);
                set({ loading: false });
            }
        },

        addToCart: async (productId, quantity) => {
            try {
                await addCart(productId, quantity);
                // optionally re-fetch cart to update UI
                const res = await getCart();
                set({
                    cart: res.data.cartItem,
                    totalAmount: res.data.totalAmount,
                    loading: false
                });
            } catch (error) {
                console.error("Add to cart failed", error)
            }
        },

        updateToCart: async (productId) => {
            try {
                await updateCart(productId);
                const res = await getCart();
                set({
                    cart: res.data.cartItem,
                    totalAmount: res.data.totalAmount,
                    loading: false
                })
            } catch (error) {
                console.error("Add to cart failed", error)
            }
        },

        moveToBagbyCart: async () => {
            try {
                await moveToBag();
                const res = await getCart();
                set({
                    cart: res.data.cartItem,
                    totalAmount: res.data.totalAmount,
                    loading: false
                })
            } catch (error) {
                console.error("Add to cart failed", error)
            }
        }
    })
)