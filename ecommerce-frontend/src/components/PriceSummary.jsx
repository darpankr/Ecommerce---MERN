import { useBagStore } from '../store/useBagStore';

const PriceSummary = () => {
    const { bag } = useBagStore();

    const total = bag.reduce((acc, item) => acc + item.Product.price * item.quantity, 0);

    const handlePlaceOrder = () => {
        console.log("Placing order...");
        // TODO: Add API call
    };

    if (!bag || bag.length === 0) {
        return <>
            <div>
                <p className="text-gray-500">Your bag is empty.</p>
            </div>
        </>;
    }

    return (
        <div className="p-4 border rounded-md shadow">
            <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
            <p>Total Items: {bag.length}</p>
            <p>Total Amount: ${total.toFixed(2)}</p>
            <button onClick={handlePlaceOrder} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                Place Order
            </button>
        </div>
    );
};

export default PriceSummary;
