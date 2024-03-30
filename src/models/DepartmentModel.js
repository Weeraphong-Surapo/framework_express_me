const { Sequelize, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
    const Department = sequelize.define('department', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false // Set timestamps option to true
    });

    return Department;
};