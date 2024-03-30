const db = require("../models")
// example import db
const Department = db.departments
const User = db.users

module.exports = {
    index: async (req, res) => {
        try {
            const departments = await Department.findAll({})
            res.status(200).json({
                success: true,
                message: "get all department",
                data: departments
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
            const data = req.body
            const count_check = await Department.count({ where: { name: data.name } })
            if (count_check >= 1) {
                res.status(400).json({
                    success: false,
                    message: "Category already!"
                })
            } else {
                const department = await Department.create(data);
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
            const department = await Department.findByPk(id)
            if (!!department) {
                res.status(200).json({
                    success: true,
                    message: "Get One Department",
                    data: department
                })
            } else res.status(404).json({
                success: false,
                message: "Department Not Found",
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
            let data = req.body
            let id = req.params.id
            const department = await Department.update(data, { where: { id: id } })
            if (!!department[0]) {
                res.status(200).json({
                    success: true,
                    message: "Updated Department Successfully!",
                })
            } else res.status(404).json({
                success: false,
                message: "Department Not Found",
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
            const user_use_department = await User.count({ where: { department_id: id } })
            if (user_use_department >= 1) {
                res.status(400).json({
                    success: false,
                    message: "Department Cannot Deleted Because Product have use!"
                })
            } else {
                const result = await Department.destroy({ where: { id: id } })
                if (result) {
                    res.status(200).json({
                        success: true,
                        message: "Deleted Department Successfully!"
                    })
                } else {
                    res.status(404).json({
                        success: false,
                        message: "Department Not Found"
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