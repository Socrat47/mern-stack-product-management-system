const Category = require('../model/Category.js')

const createCategory = async (req, res) => {
    const { name, description } = req.body;

    try {
        const category = await Category.create({ name, description })
        return res.status(201).json({ message: "Kategori Başarıyla Oluşturuldu!", category: category })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: "Bilinmeyen bir hatayla karşılaşıldı!" })
    }
}

module.exports = createCategory;