//getBagItems, updateBagItemQty, deleteBagItem, placeOrder

import API from './api';


export const getBagItems = async () => API.get('/bag');
export const updateBagItemQty = (productId, delta) => API.put(`/bag/update/${productId}`, { delta });
export const deleteBagItem = (productId) => API.delete(`/bag/delete/${productId}`);
export const placeOrder = () => API.post('/bag/place-order');


// export const getBagItems = async () => {
//   // Simulated async fetch
//   return Promise.resolve([
//     {
//       id: 1,
//       quantity: 2,
//       Product: {
//         id: 3,
//         name: "Samsung Galaxy S24 Ultra",
//         description: "Flagship Android phone with advanced camera and AI features.",
//         price: 1099,
//         imageUrl: "https://example.com/images/galaxys24.jpg"
//       }
//     },
//     {
//       id: 2,
//       quantity: 1,
//       Product: {
//         id: 5,
//         name: "Dell XPS 13",
//         description: "Ultra-portable laptop with Intel i7 processor and 16GB RAM.",
//         price: 1299,
//         imageUrl: "https://example.com/images/dellxps13.jpg"
//       }
//     }
//   ]);
// };