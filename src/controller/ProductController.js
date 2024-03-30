const db = require("../models")
// example import db
const Product = db.products
const Category = db.categorys

module.exports = {
    index: async (req, res) => {
        try {
            const products = await Product.findAll({
                include: [{
                    model: Category,
                    as: "category"
                }],
                attributes: { exclude: ['category_id'] } // Exclude category_id from product attributes as well
            })
            res.status(200).json({
                success: true,
                message: "Get All Products",
                data: products
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Internal server error "
            })
        }
    },

    store: async (req, res) => {
        try {
            let data = req.body
            data.category_id = data.category
            const products = await Product.create(data)
            res.status(200).json({
                success: true,
                message: "Create Product Successfully!",
                data: products
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Internal server error "
            })
        }
    },

    show: async (req, res) => {
        try {
            let id = req.params.id
            const product = await Product.findByPk(id)
            if (product) {
                res.status(200).json({
                    success: true,
                    message: "Get One Product",
                    data: product
                })
            } else {
                res.status(404).json({
                    success: false,
                    message: "Product Not Found",
                })
            }

        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Internal server error "
            })
        }
    },

    update: async (req, res) => {
        try {
            let id = req.params.id
            let data = req.body
            data.category_id = data.category
            const product = await Product.update(data, { where: { id: id } })
            if (!!product[0]) {
                res.status(200).json({
                    success: true,
                    message: "Updated Product Successfully!",
                })
            } else {
                res.status(404).json({
                    success: false,
                    message: "Product Not Found!",
                })
            }

        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Internal server error "
            })
        }
    },
    destroy: async (req, res) => {
        try {
            let id = req.params.id
            const product = await Product.destroy({ where: { id: id } })
            if (!!product) {
                res.status(200).json({
                    success: true,
                    message: "Deleted Product Successfully"
                })
            } else {
                res.status(404).json({
                    success: false,
                    message: "Product Not Found!"
                })
            }

        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Internal server error "
            })
        }
    }
}