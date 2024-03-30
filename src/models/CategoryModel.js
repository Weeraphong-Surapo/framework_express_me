const { Sequelize, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
    const Category = sequelize.define('category', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        timestamps: false // Set timestamps option to true
    });

    return Category;
};