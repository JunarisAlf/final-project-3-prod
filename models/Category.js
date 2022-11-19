'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Category extends Model {
       
        static associate(models) {
            this.hasMany(models.Product, {
                foreignKey: 'CategoryId'
            })
        }
    }
    Category.init(
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            type: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            sold_product_amount: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true,
                    isInt: true
                }
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
        },
        {
            sequelize,
            modelName: 'Category',
            tableName: 'Category',
            
        }
    );
    return Category;
};
