const { Sequelize, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
    const Order = sequelize.define('order', {
        list_sale_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    
    return Order;
};