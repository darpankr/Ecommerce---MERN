import API from "./api";



export const getCart = () => API.get("/cart")
export const addCart = async (productId, quantity=1) => {
    return API.post("/cart/add", { productId, quantity});
}

export const updateCart = async (productId) => {
    return API.put(`/cart/${productId}`)
}

export const moveToBag = () => API.post('/bag/move');

