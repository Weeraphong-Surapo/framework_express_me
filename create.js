const fs = require('fs');
const path = require('path');

const command = process.argv[2];
const fileName = process.argv[3];

if (!command || !fileName) {
    console.log('Usage: node create.js <command> <filename>');
    process.exit(1);
}

switch (command) {
    case 'controller':
        createController(fileName);
        break;
    case 'router':
        createRouter(fileName);
        break;
    case 'model':
        createModel(fileName);
        break;
    default:
        console.log('Invalid command');
        process.exit(1);
}

function createController(fileName) {
    const filePath = path.join(__dirname, `src/controller/${fileName}.js`);

    if (fs.existsSync(filePath)) {
        console.error('File already exists:', filePath);
        process.exit(1);
    }

    const controllerTemplate = `const db = require("../models")
// example import db
// const Product = db.products
    
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
}`;

    fs.writeFile(filePath, controllerTemplate, (err) => {
        if (err) {
            console.error('Error creating file:', err);
            process.exit(1);
        }
        console.log(`${fileName}.js created successfully! in src/controller/${fileName}.js`);
    });
}

function createRouter(fileName) {
    const filePath = path.join(__dirname, `src/routes/${fileName}.js`);

    if (fs.existsSync(filePath)) {
        console.error('File already exists:', filePath);
        process.exit(1);
    }

    const routerName = fileName.replace(/Router$/, ''); // Remove "Router" suffix
    const routerTemplate = `// import controllers 
const { index, store, update, show, destroy } = require("../controller/${routerName}Controller") // แก้ที่นี่เพื่อใช้ fileName
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
    
module.exports = router`;

    fs.writeFile(filePath, routerTemplate, (err) => {
        if (err) {
            console.error('Error creating file:', err);
            process.exit(1);
        }
        console.log(`${fileName}.js created successfully! in src/routes/${fileName}.js`);
    });
}

function createModel(fileName) {
    const filePath = path.join(__dirname, `src/models/${fileName}.js`);

    if (fs.existsSync(filePath)) {
        console.error('File already exists:', filePath);
        process.exit(1);
    }

    const modelName = fileName.replace(/Model$/, ''); // Remove "Model" suffix
    const modelTemplate = `const { Sequelize, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
    const ${modelName} = sequelize.define('${modelName.toLowerCase()}', {
        example: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    
    return ${modelName};
};`;

    fs.writeFile(filePath, modelTemplate, (err) => {
        if (err) {
            console.error('Error creating file:', err);
            process.exit(1);
        }
        console.log(`${fileName}.js created successfully! in src/models/${fileName}.js`);
    });
}
