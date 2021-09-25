module.exports = (sequelize, dataTypes) => {

    let alias = "Products";

    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        price: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        description: {
            type: dataTypes.STRING(500),
            allowNull: false
        },
        genre: {
            type: dataTypes.STRING(45),
            allowNull: false,
        },
        category_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        brand_id: {
            type: dataTypes.INTEGER,
            defaultValue: null
        }
    };

    let config = {
        tableName: "products",
        timestamps: false
    };

    const Products = sequelize.define(alias, cols, config);

    Products.associate = models => {
        Products.belongsTo(models.Categories, {
            as: "categories",
            foreignKey: "category_id"
        }),
        Products.belongsTo(models.Brands, {
            as: "brands",
            foreignKey: "brand_id"
        }),
        Products.belongsToMany(models.Sizes, {
            as: "sizes",
            through: 'product_size',
            foreignKey: "product_id",
            otherKey: 'size_id',
            timestamps: false
        }),
        Products.hasMany(models.Images, {
            as: "images",
            foreignKey: "product_id",
        })
    }

    return Products
}