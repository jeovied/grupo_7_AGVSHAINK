module.exports = (sequelize, dataTypes) => {

    let alias = "Product_size";

    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        product_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        size_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        }
    };

    let config = {
        tableName: "product_size",
        timestamps: false
    };

    const Product_size = sequelize.define(alias, cols, config);

    return Product_size
}