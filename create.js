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
        createRouter(fileName); // แก้ที่นี่เพื่อส่งพารามิเตอร์ fileName
        break; // เพิ่ม break เพื่อหยุดการทำงานของ switch statement 
    case 'model':
        createModel(fileName); // แก้ที่นี่เพื่อส่งพารามิเตอร์ fileName
        break; // เพิ่ม break เพื่อหยุดการทำงานของ switch statement 
    default:
        console.log('Invalid command');
        process.exit(1);
}

function createController(fileName) {
    const controllerTemplate = `const db = require("../models")
// example import db
// const Product = db.products
    
module.exports = {
    index: async (req, res) => {

    },

    store: async (req, res) => {

    },
        
    show: async (req, res) => {
    
    },

    update: async (req, res) => {
    
    },
    destroy: async (req, res) => {
    
    }
}`;
    const filePath = path.join(__dirname, `src/controller/${fileName}.js`);

    fs.writeFile(filePath, controllerTemplate, (err) => {
        if (err) {
            console.error('Error creating file:', err);
            process.exit(1);
        }
        console.log(`${fileName}.js created successfully! in src/controller/${fileName}.js`);
    });
}

function createRouter(fileName) { // แก้ที่นี่เพื่อรับพารามิเตอร์ fileName
    const routerName = fileName.replace(/Router$/, ''); // Remove "Router" suffix
    const routerTemplate = `// import controllers 
const { index, store, update, show, destroy } = require("../controller/${routerName}Controller") // แก้ที่นี่เพื่อใช้ fileName
    
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
    
module.exports = router`;
    const filePath = path.join(__dirname, `src/routes/${fileName}.js`);

    fs.writeFile(filePath, routerTemplate, (err) => {
        if (err) {
            console.error('Error creating file:', err);
            process.exit(1);
        }
        console.log(`${fileName}.js created successfully! in src/controller/${fileName}.js`);
    });
}


function createModel(fileName) {
    const modelName = fileName.replace(/Model$/, ''); // Remove "Router" suffix
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
    const filePath = path.join(__dirname, `src/models/${fileName}.js`);

    fs.writeFile(filePath, modelTemplate, (err) => {
        if (err) {
            console.error('Error creating file:', err);
            process.exit(1);
        }
        console.log(`${fileName}.js created successfully! in src/models/${fileName}.js`);
    });
}

