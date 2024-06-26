const { Sequelize, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
    const Product = sequelize.define('product', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(10, 2)
        },
        cost: {
            type: DataTypes.DECIMAL(10, 2)
        },
        exp_date: {
            type: DataTypes.STRING(100)
        },
        published: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        image: {
            type: DataTypes.TEXT
        },
        code: {
            type: DataTypes.TEXT
        },
        stock: {
            type: DataTypes.INTEGER
        },
        description: {
            type: DataTypes.TEXT
        },
        storage_address: {
            type: DataTypes.TEXT
        },
        category_id: { // Define category_id field
            type: DataTypes.INTEGER,
            // allowNull: false
        }
    });

    const Category = require('./CategoryModel')(sequelize, DataTypes); // Assuming your CategoryModel file is named 'CategoryModel.js'

    Product.belongsTo(Category, {
        foreignKey: 'category_id',
        as: 'category'
    });

    return Product;
};
