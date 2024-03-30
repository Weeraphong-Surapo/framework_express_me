// import controllers 
const { index, store, update, show, destroy } = require("../controller/CategoryController") // แก้ที่นี่เพื่อใช้ fileName
const { body, validationResult } = require('express-validator');

// router
const router = require("express").Router()

// validation
const validation = [
    body('name')
        .notEmpty().withMessage('กรุณากรอกชื่อหมวดหมู่')
]

// use router
router.get("/", index)
router.get("/:id", show)
router.post("/", validation, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } else store(req, res);
})
router.delete("/:id", destroy)
router.patch("/:id", validation, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } else update(req, res);
})

module.exports = router