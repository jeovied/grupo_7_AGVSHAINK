module.exports = (sequelize, dataTypes) => {

    let alias = "Sizes";

    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        size: {
            type: dataTypes.INTEGER,
            allowNull: false
        }
    };

    let config = {
        tableName: "sizes",
        timestamps: false
    };

    const Sizes = sequelize.define(alias, cols, config);

    /* Sizes.associate = models => {
        Sizes.belongsToMany(models.Products, {
            as: "products",
            through: 'product_size',
            foreignKey: "size_id",
            otherKey: 'product_id',
            timestamps: false
        })
    } */

    return Sizes
}