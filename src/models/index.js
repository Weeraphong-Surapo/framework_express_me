const dbConfig = require("../config/dbConfig")

const { Sequelize, DataTypes } = require("sequelize")

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    dialect: dbConfig.dialect,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
})


sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((err) => {
        console.log('Unable to connect to the database:', err);
    });

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize


// use table
db.categorys = require("./CategoryModel.js")(sequelize, DataTypes)
db.products = require("./ProductModel.js")(sequelize, DataTypes)
db.users = require("./UserModel.js")(sequelize, DataTypes)
db.departments = require("./DepartmentModel.js")(sequelize, DataTypes)
db.listsals = require("./ListSaleModel.js")(sequelize, DataTypes)
db.orders = require("./OrderModel.js")(sequelize, DataTypes)

// refresh Database
// sequelize.drop();


db.sequelize.sync({ force: false }).then(() => {
    console.log('yes re-sync done!');
})



module.exports = db