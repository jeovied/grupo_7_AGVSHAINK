module.exports = (sequelize, dataTypes) => {

    let alias = "Categories";

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
        }
    };

    let config = {
        tableName: "categories",
        timestamps: false
    };

    const Categories = sequelize.define(alias, cols, config);

    return Categories
}