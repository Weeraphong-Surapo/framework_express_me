const { Sequelize, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
    const ListSale = sequelize.define('listsale', {
        code: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        vat: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false
        },
        total_product_price: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false
        },
        total_all_price: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false
        },
        count_product: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    
    return ListSale;
};