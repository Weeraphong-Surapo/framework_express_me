// import controllers 
const { index, store, update, show, destroy } = require("../controller/ProductController") // แก้ที่นี่เพื่อใช้ fileName
    
// router
const router = require("express").Router()
    
// example use router
// router.get("/", nameFunction)

// use router
router.get("/", index)
router.get("/:id", show)
router.post("/", store)
router.delete("/:id", destroy)
router.patch("/:id", update)
    
module.exports = router