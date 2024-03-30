const express = require("express")
const cors = require("cors")
const app = express()

var corOptions = {
    origin: 'http://localhost:5173'
}
app.use(cors(corOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// router
const ProductRouter = require("./src/routes/ProductRouter")
const CategoryRouter = require("./src/routes/CategoryRouter")
const DepartmentRouter = require("./src/routes/DepartmentRouter")
const UserRouter = require("./src/routes/UserRouter")



// use router
app.use("/api/product", ProductRouter)
app.use("/api/category", CategoryRouter)
app.use("/api/department", DepartmentRouter)
app.use("/api/user", UserRouter)


app.use("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "test api successfully!"
    })
})


// port
const PORT = process.env.PORT || 8002

// server
app.listen(PORT, () => {
    console.log(`server is running port ${PORT}`);
})