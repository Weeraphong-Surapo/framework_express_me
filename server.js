const express = require("express")
const cors = require("cors")
const app = express()

var corOptions = {
    origin: 'http://localhost:8081'
}
app.use(cors(corOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// router
const ProductRouter = require("./src/routes/ProductRouter")

app.use("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "test api successfully!"
    })
})

// use router
app.use("/api/product", ProductRouter)


// port
const PORT = process.env.PORT || 8002

// server
app.listen(PORT, () => {
    console.log(`server is running port ${PORT}`);
})