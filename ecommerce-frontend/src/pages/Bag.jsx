import React, { useEffect } from 'react';
import BagPage from '../components/BagPage';
import { useBagStore } from '../store/useBagStore';

const Bag = () => {
    const { fetchBag } = useBagStore();

    useEffect(() => {
        fetchBag();
    }, []);

    return <BagPage />;
};

export default Bag;
