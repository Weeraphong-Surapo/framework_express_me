const { Sequelize, DataTypes } = require("sequelize");
    module.exports = (sequelize) => {
    const Category = sequelize.define('category', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    
    return Category;
};