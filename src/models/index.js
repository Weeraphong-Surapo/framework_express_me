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

// refresh Database
sequelize.drop();


db.products = require("./ProductModel.js")(sequelize, DataTypes)
db.categorys = require("./CategoryModel.js")(sequelize, DataTypes)

// 1 to many Relation



db.sequelize.sync({ force: false }).then(() => {
    console.log('yes re-sync done!');
})



// 1 to many Relation

// db.products.hasMany(db.reviews, {
//     foreignKey: 'product_id',
//     as: 'review'
// })

// db.reviews.belongsTo(db.products, {
//     foreignKey: 'product_id',
//     as: 'product'
// })


module.exports = db