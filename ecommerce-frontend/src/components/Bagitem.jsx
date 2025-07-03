import { useBagStore } from '../store/useBagStore';
import { toast } from 'react-hot-toast';
import { useState } from 'react';

const BagItem = ({ item }) => {
    const { deleteFromBag, updateQuantity } = useBagStore();
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        try {
            setLoading(true);
            await deleteFromBag(item.Product.id);
            toast.success("Item removed from bag");
        } catch (error) {
            toast.error("Failed to remove item");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = () => {
        updateQuantity(item.Product.id, 1);
    };

    const handleSub = () => {
        if (item.quantity <= 1) {
            handleDelete();
        } else {
            updateQuantity(item.Product.id, -1);
        }
    };

    if (!item) return null;

    return (
        <div className="p-4 border rounded-md shadow">
            <div className="flex justify-between items-center">
                <div className="flex gap-4">
                    <div>
                        <h2 className="text-lg font-semibold">{item.Product.name}</h2>
                        <p>Price: ${item.Product.price}</p>
                        <p>Quantity: {item.quantity}</p>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <button onClick={handleAdd} className="bg-green-500 text-white px-2 py-1 rounded">+</button>
                    <button onClick={handleSub} className="bg-red-500 text-white px-2 py-1 rounded">-</button>
                    <button onClick={handleDelete} disabled={loading} className="text-sm text-red-600 underline hover:cursor-pointer">Remove</button>
                </div>
            </div>
        </div>
    );
};

export default BagItem;
