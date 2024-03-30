const db = require("../models")
// example import db
const ListSale = db.listsals

module.exports = {
    index: async (req, res) => {
        try {

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
            const list_sale = await ListSale.create(data)
            res.status(200).json({
                success: true,
                message: "Payment Successfully!",
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

        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Internal server error "
            })
        }
    },

    update: async (req, res) => {
        try {

        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Internal server error "
            })
        }
    },
    destroy: async (req, res) => {
        try {

        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Internal server error "
            })
        }
    }
}