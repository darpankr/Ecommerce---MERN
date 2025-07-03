
const Product = require('../models/product');

//CREATE PRODUCT
exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, imageUrl } = req.body;
        const product = await Product.create({ name, description, price, imageUrl });
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: "Failed to create product"});
    }
};

//GET ALL PRODUCT

exports.getAllProduct = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products)
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch products"});
    }
};

//GET PRODUCT BY ID

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) return res.status(404).json({ error: "Product not found"});
        res.json(product)
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch product"})
    }
};

//UPDATE PRODUCT

exports.updateProduct = async (req, res) => {

    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) return res.status(404).json({ error: "Product not found"});

        const { name, description, price, imageUrl } = req.body;
        await product.update({ name, description, price, imageUrl});
        res.json(product)
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch product"})
    }
}

//DELETE PRODUCT

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) return res.status(404).json({ error: "Product not found"});

        await product.destroy();
        res.json({ message: "Product Deleted"});
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch products"})
    }
}

