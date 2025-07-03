
const { Cart, Bag, Product } = require('../models');


exports.getBag = async (req, res) => {
    const userId = req.user.id;

    try {
        const bagItems = await Bag.findAll({
            where: { UserId: userId },
            include: { model: Product}
        });

        // console.log(bagItems)

        if(!bagItems) {
            return res.status(404).json({ error: "No items in bag "});
        }

        res.status(200).json(bagItems);
    } catch (error) {
        console.log("Bag items fetch Failes");
        res.status(500).json({ error: "Failed to fetch Bag items"});
    }
}

exports.moveToBag = async (req, res) => {
    const userId = req.user.id;

    try {

        const cartItems = await Cart.findAll({
            where: { UserId: userId},
            include: [{ model: Product}]
        });

        if (!cartItems.length) {
            return res.status(404).json({ error: "No Items in cart "});
        }

        for (const item of cartItems) {
            const existingItem = await Bag.findOne({
                where: { UserId: userId, ProductId: item.ProductId}
            });

            if(existingItem) {
                existingItem.quantity += item.quantity;
                await existingItem.save();
            } else {
                await Bag.create({
                    UserId: userId,
                    ProductId: item.ProductId,
                    quantity: item.quantity
                });
            }
        }

        await Cart.destroy({ where: { UserId: userId } });

        res.status(200).json({ message: "Items moved to bag successfully "});
    } catch (error) {
        console.log("Move to Bag Error", error);
        res.status(500).json({ error: "Failed to move items to bag"})
    }
}

//DELETE BAG

exports.deleteBagItem = async (req, res) => {
    const userId = req.user.id;
    const productId = req.params.id;

    try {
        const existing = await Bag.findOne({
            where: { UserId: userId, ProductId: productId}
        });

        if(!existing) {
            return res.status(404).json({ error: "Item not found"});
        }

        await existing.destroy();
        res.status(200).json({ message: "Item in the Bag deleted "});
    } catch (error) {
        console.log("delete operation failed");
        res.status(500).json({ error: "Failed to delete Item"});
    }
}

//UPDATE BAG QUANTITY

exports.updateBagQuantity = async (req, res) => {
    const userId = req.user.id;
    const productId = req.params.id;
    const { delta } = req.body;

    try {
        const item = await Bag.findOne({
            where: { UserId: userId, ProductId: productId}
        });

        if(!item) {
            return res.status(400).json({ error: "Item not found in bag ", productId, userId});
        }

        item.quantity += delta;

        if (item.quantity <= 0) {
            item.destroy();
            return res.status(200).json({ message: " Item removed from Bag quantity 0"});
        }

        await item.save();
        res.status(200).json({ message: " Quantity Updated! ", item});
    } catch (error) {
        console.error("Update quantity failed:", error);
        res.status(500).json({ error: "Failed to update quantity" });
    }
}