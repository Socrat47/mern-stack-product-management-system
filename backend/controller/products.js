const Product = require('../model/product.js');
const Category = require('../model/Category.js');

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('categoryId', 'name'); // Kategori bilgilerini dahil et
        if (!products) {
            return res.status(404).json({ message: "Ürünler Bulunamadı!" });
        }
        return res.status(200).json({ products: products });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Bilinmeyen bir hata oluştu!" });
    }
};

const getProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id).populate('categoryId', 'name'); // Kategori bilgilerini dahil et

        if (!product) {
            return res.status(404).json({ message: "Ürün Bulunamadı!" });
        }

        res.status(200).json({ message: "Ürün Başarıyla Getirildi!", product: product });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Bilinmeyen Bir Hatayla Karşılaşıldı!" });
    }
};

const createProduct = async (req, res) => {
    const { name, description, price, stockQuantity, imageUrl, categoryName } = req.body;

    try {
        const category = await Category.findOne({ name: categoryName });

        if (!category) {
            return res.status(404).json({ message: "Kategori Bulunamadı!" });
        }

        const product = await Product.create({
            name,
            description,
            price,
            stockQuantity,
            imageUrl,
            categoryId: category._id
        });

        return res.status(201).json({
            message: "Ürün Başarıyla Oluşturuldu!",
            product: product
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Bilinmeyen bir hatayla karşılaşıldı!" });
    }
};

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, stockQuantity, imageUrl, categoryName } = req.body;

    try {
        const category = await Category.findOne({ name: categoryName });

        if (!category) {
            return res.status(404).json({
                message: "Kategori Bulunamadı!"
            });
        }

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({
                message: "Ürün Bulunamadı!"
            });
        }

        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.stockQuantity = stockQuantity || product.stockQuantity;
        product.imageUrl = imageUrl || product.imageUrl;
        product.categoryId = category._id;

        await product.save();

        res.status(200).json({
            message: "Başarıyla Ürün Güncellendi!",
            product: product
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Bilinmeyen Bir Hatayla Karşılaşıldı!" });
    }
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findOneAndDelete({ _id: id });
        if (!product) {
            return res.status(404).json({ message: "Ürün Bulunamadı!" });
        }

        res.status(200).json({ message: "Ürün Başarıyla Silindi!", product: product });
    } catch (error) {
        console.log(error.message);

        return res.status(500).json({ message: "Bilinmeyen bir hatayla karşılaşıldı!" });
    }
};

module.exports = { getAllProducts, getProduct, createProduct, updateProduct, deleteProduct };
