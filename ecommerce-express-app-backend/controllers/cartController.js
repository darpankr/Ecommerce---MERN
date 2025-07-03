
const Cart = require('../models/cart')
const Product = require('../models/product')

//ADD TO CART
exports.addToCart = async (req, res) => {
    const userId = req.user.id;
    const { productId, quantity } = req.body;
    try {
        const existing = await Cart.findOne({ where: { userId, productId}});
        if(existing) {
            existing.quantity += parseInt(quantity);
            await existing.save();
            return res.json({ message: "Cart Updated", cart: existing})
        }
        const cartItem = await Cart.create({
            UserId: userId,
            ProductId: productId,
            quantity: parseInt(quantity)
        });
        // Refetch with associations (e.g., product)
        const fullCartItem = await Cart.findByPk(cartItem.id, {
        include: [{ model: Product }],
        });
        res.status(200).json({ message: "Added to cart", cart: fullCartItem})
    } catch (error) {
        console.error('Add to Cart Error:', error);
        res.status(500).json({ error: 'Failed to add to cart' });
    }
}

//GET CART

exports.getCart = async (req, res) => {
    const userId = req.user.id;

    try {
        const cartItem = await Cart.findAll({
            where: { UserId: userId },
            include: [{ model: Product }]
        });
        const totalAmount = cartItem.reduce((acc, item) => {
            const productPrice = item.Product?.price || 0;
            return acc + item.quantity * productPrice;
        }, 0);
        res.json({cartItem, totalAmount, message: "testing"});
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch cart' });
    }
}

//REMOVE FROM CART

exports.removeFromCart = async (req, res) => {
    const userId = req.user.id;
    const cartId = req.params.id;

    try {
        const cartItem = await Cart.findOne({
            where: { id: cartId, userId }
        });

        if (!cartItem) return res.status(404).json({ message: "Item not found in cart"});

        await cartItem.destroy();
        res.json({ message: "Item removed from the cart "})
    } catch (error) {
        res.status(500).json({ error: 'Failed to remove item from cart' });
    }
}

//GET CAR BY ID
exports.getCartById = async (req, res) => {
    const userId = req.user.id;
    const productId = req.params.id;

    try {
        const existing = await Cart.findOne({
            where: { ProductId: productId, UserId: userId }, // Ensure `UserId` matches your model
            include: [{ model: Product }] // Optional: include product details
        });

        if (!existing) {
            return res.status(404).json({ error: "Cart Item Not Found" });
        }

        res.status(200).json(existing);
    } catch (error) {
        console.error("Get Cart By ID Error:", error);
        res.status(500).json({ error: "Failed to fetch cart" });
    }
}

//UPDATE CART
exports.updateCart = async (req, res) => {
    const userId = req.user.id;
    const productId = req.params.id;

    try {
        const cartItem = await Cart.findOne({
            where: { UserId: userId, ProductId: productId}
        });

        if(!cartItem) return res.status(404).json({ error: "Cart item not found "});

        // Decrement quantity but ensure it doesn't go below 1
        if (cartItem.quantity > 1) {
            cartItem.quantity -= 1;
            await cartItem.save();
            return res.status(200).json({ message: "Cart updated", cart: cartItem });
        } else {
            // Optionally delete the cart item if quantity hits 0
            await cartItem.destroy();
            return res.status(200).json({ message: "Item removed from cart" });
        }
    } catch (error) {
        console.error("Get Cart Error:", error);
        res.status(500).json({ error: "Failed to fetch cart item", userId, productId });
    }
}