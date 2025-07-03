import { create } from 'zustand';
import { getBagItems, deleteBagItem, updateBagItemQty } from '../api/bag';

export const useBagStore = create((set, get) => ({
    bag: [],

    fetchBag: async () => {
        try {
            const res = await getBagItems();
            set({
                bag: res.data || []
            });
        } catch (error) {
            console.error("Fetch bag failed", error);
        }
    },

    deleteFromBag: async (productId) => {
        // Optimistically remove item
        set((state) => ({
            bag: state.bag.filter(item => item.Product.id !== productId)
        }));

        try {
            await deleteBagItem(productId);
        } catch (error) {
            console.error("Delete from bag failed", error);
            // fallback to actual data in case of failure
            get().fetchBag();
        }
    },

    updateQuantity: async (productId, delta) => {

        try {
            const res = await updateBagItemQty(productId, delta);
            const updatedItem = res.data.item;

            if (!updatedItem) {
                set((state) => ({
                    bag: state.bag.filter(item => item.Product.id !== productId)
                }))
            } else {
                set((state) => ({
                    bag: state.bag.map(item => 
                        item.Product.id === productId ? { ...item, quantity: updatedItem.quantity} : item
                    )
                }))
            }
        } catch (error) {
            console.error("Quantity update failed", error);
        }
    }
}));
