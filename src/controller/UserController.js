const db = require("../models")
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken")
const jwt = require("jsonwebtoken");


// example import db
const User = db.users
const Department = db.departments

module.exports = {
    index: async (req, res) => {
        try {
            const users = await User.findAll({
                include: [{
                    model: Department,
                    as: "department"
                }]
            })
            res.status(200).json({
                success: true,
                message: "get all user",
                data: users
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
            const salt = genSaltSync(10);
            data.department_id = data.department
            data.password = hashSync(data.password, salt)

            const check_use_email = await User.count({ where: { email: data.email } })

            if (check_use_email >= 1) {
                res.status(400).json({
                    success: false,
                    message: "Email already!"
                })
            } else {
                const user = await User.create(data)
                res.status(200).json({
                    success: true,
                    message: "Create User Successfully!"
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
            const user = await User.findByPk(id)
            if (!!user) {
                res.status(200).json({
                    success: true,
                    message: "Get One User",
                    data: user
                })
            } else res.status(404).json({
                success: false,
                message: "User Not Found",
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
            const user = await User.update(data, { where: { id: id } })
            if (!!user[0]) {
                res.status(200).json({
                    success: true,
                    message: "Updated User Successfully!",
                })
            } else res.status(404).json({
                success: false,
                message: "User Not Found",
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
            const user = await User.destroy({ where: { id: id } })
            if (!!user) {
                res.status(200).json({
                    success: true,
                    message: "Deleted User Successfully"
                })
            } else {
                res.status(404).json({
                    success: false,
                    message: "User Not Found!"
                })
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Internal server error "
            })
        }
    },

    register: async (req, res) => {

    },
    login: async (req, res) => {
        const data = req.body;

        try {
            // Check if email exists
            const user = await User.findOne({ where: { email: data.email } });
            if (!user) {
                return res.status(400).json({ error: "Email not found" });
            }

            // Compare passwords
            const isPasswordValid = await compareSync(data.password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ error: "Invalid password" });
            }

            // Generate JWT token
            const jsontoken = jwt.sign({ user: user }, "qwe1234", {
                expiresIn: "1h",
            });

            // // Send token as response
            return res.status(200).json({ token: jsontoken, user: user });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }
}