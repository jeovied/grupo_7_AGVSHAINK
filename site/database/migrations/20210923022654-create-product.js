'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(20)
      },
      price: {
        type: Sequelize.INTEGER(5)
      },
      description: {
        type: Sequelize.STRING(500)
      },
      genre: {
        type: Sequelize.STRING(50)
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references : {
          model : {
            tableName : 'Categories'
          },
          key : 'id'
        }
      },
      sizeId: {
        type: Sequelize.INTEGER,
        references : {
          model : {
            tableName : 'Sizes'
          },
          key : 'id'
        }
      },
      brandId: {
        type: Sequelize.INTEGER,
        references : {
          model : {
            tableName : 'Brands'
          },
          key : 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Products');
  }
};