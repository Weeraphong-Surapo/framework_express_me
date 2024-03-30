// import controllers 
const { index, store, update, show, destroy, login } = require("../controller/UserController") // แก้ที่นี่เพื่อใช้ fileName
const { body, validationResult } = require('express-validator');

// router
const router = require("express").Router()


// example validation
// const validation = [
//     body('name')
//         .notEmpty().withMessage('กรุณากรอกชื่อ')
//         .isLength({ min: 5 }).withMessage('ชื่อต้องมีความยาวอย่างน้อย 5 ตัวอักษร'),
//     body('price')
//         .notEmpty().withMessage("กรุณากรอกราคา")
// ]

// use router
router.get("/", index)
router.get("/:id", show)
router.post("/", store)
router.delete("/:id", destroy)
router.patch("/:id", update)
router.post("/login", login)

module.exports = router