import BagItem from './bagItem';
import PriceSummary from './PriceSummary';
import { useBagStore } from '../store/useBagStore';

const BagPage = () => {
    const { bag } = useBagStore();

    return (
        <div className="flex flex-col p-6">
            <h1 className="text-2xl font-bold mb-4">MY BAG</h1>
            <div className="flex gap-6 flex-col lg:flex-row">
                {/* Bag List */}
                <div className="flex flex-col gap-4 w-full lg:w-2/3">
                    {bag.map(item => (
                        <BagItem key={item.id} item={item} />
                    ))}
                </div>

                {/* Price Summary */}
                <div className="w-full lg:w-1/3">
                    <PriceSummary />
                </div>
            </div>
        </div>
    );
};

export default BagPage;
