module.exports = (sequelize, dataTypes) => {

    let alias = "Images";

    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        file: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        product_id: {
            type: dataTypes.INTEGER,
            defaultValue: null
        }
    };

    let config = {
        tableName: "images",
        timestamps: false
    };

    const Images = sequelize.define(alias, cols, config);

    return Images
}