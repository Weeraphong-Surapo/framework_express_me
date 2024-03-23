module.exports = (sequelize) => {
    const Product = sequelize.define('Product', {
        example: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    
    return Product;
};