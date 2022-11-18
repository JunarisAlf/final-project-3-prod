const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            
        }
    }
    User.init(
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            full_name: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: true,
                },
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
                validate: {
                    isEmail: true,
                    notEmpty: true,
                },
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                    len: [6, 10],
                },
            },
            gender: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                    isIn: [['male', 'female']],
                },
            },
            role: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                    isIn: [['admin', 'customer']],
                },
            },

            balance: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true,
                    isInt: true,
                    max: 100000000,
                    min: 0,
                },
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
        },
        {
            sequelize,
            modelName: 'User',
            tableName: 'User'
        }
    );
    return User;
};
