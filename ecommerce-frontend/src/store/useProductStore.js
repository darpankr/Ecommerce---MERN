import { create } from 'zustand'
import { getProducts } from '../api/product';

export const useProductStore = create(
    (set) => ({
        products: [],
        loading: false,

        fetchProducts: async () => {
            try {
                set({ loading: true });
                const res = await getProducts();
                set({ products: res.data, loading: false})
            } catch (error) {
                console.error('Failed to fetch products:', error);
                set({ loading: false });
            }
        }
    })
)