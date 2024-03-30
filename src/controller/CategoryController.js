const db = require("../models")
// example import db
const Product = db.products
const Category = db.categorys

module.exports = {
    index: async (req, res) => {
        try {
            const categorys = await Category.findAll({})
            res.status(201).json({
                success: true,
                message: "Get All Category",
                data: categorys
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
            const count_check = await Category.count({ where: { name: data.name } })

            if (count_check >= 1) {
                res.status(400).json({
                    success: false,
                    message: "Category already!"
                })
            } else {
                const category = await Category.create(data)
                res.status(201).json({
                    success: true,
                    message: "Created Category Successfully!"
                })
            }


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
            const category = await Category.findByPk(id)
            if (!!category) {
                res.status(200).json({
                    success: true,
                    message: "Get One Category",
                    data: category
                })
            } else res.status(404).json({
                success: false,
                message: "Category Not Found",
            })


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
            const category = await Category.update(data, { where: { id: id } })
            if (!!category[0]) {
                res.status(200).json({
                    success: true,
                    message: "Updated Category Successfully!",
                })
            } else res.status(404).json({
                success: false,
                message: "Category Not Found",
            })

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
            const product_use_category = await Product.count({ where: { category_id: id } })
            if (product_use_category >= 1) {
                res.status(400).json({
                    success: false,
                    message: "Category Cannot Deleted Because Product have use!"
                })
            } else {
                const result = await Category.destroy({ where: { id: id } })
                if (result) {
                    res.status(200).json({
                        success: true,
                        message: "Deleted Category Successfully!"
                    })
                } else {
                    res.status(404).json({
                        success: false,
                        message: "Category Not Found"
                    })
                }
            }

        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Internal server error "
            })
        }
    }
}