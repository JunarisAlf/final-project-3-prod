'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class TransactionHistory extends Model {

        static associate(models) {
            this.belongsTo(models.Product, {
                foreignKey: 'ProductId'
            })
            this.belongsTo(models.User, {
                foreignKey: 'UserId'
            })
        }
    }
    TransactionHistory.init(
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            ProductId: {
                type: DataTypes.INTEGER,
            },
            UserId: {
                type: DataTypes.INTEGER,
            },
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true,
                    isInt: true
                }
            },
            total_price: {
                type: DataTypes.INTEGER,
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
            modelName: 'TransactionHistory',
            tableName: 'TransactionHistory'
        }
    );
    return TransactionHistory;
};
