const { Sequelize, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
    const User = sequelize.define('user', {
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        line: {
            type: DataTypes.STRING,
            allowNull: false
        },
        published: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        department_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        },
        salary:{
            type:DataTypes.DECIMAL(10,2)
        }
    });

    const Department = require('./DepartmentModel')(sequelize, DataTypes); // Assuming your CategoryModel file is named 'CategoryModel.js'

    User.belongsTo(Department, {
        foreignKey: 'department_id',
        as: 'department'
    });

    return User;
};