const {
    Category,
    Product,
    TransactionHistory,
    User,
    sequelize,
} = require('../models/index');

class TransactionController {
    static async update(req, res, next) {
        const {ProductId, quantity} = req.body;
        const {id, email} = req.user;
        try {
            // Check ProductId is valid
            let product = await Product.findOne({where: {id: ProductId}});
            if (!product) throw {name: 'BadRequest'};
            // Check Product stock
            if (product.stock - quantity < 0) throw {name: 'ProductSoldOut'};

            let product_name = product.title;
            let total_price = quantity * product.price;
            // Check balance
            let user = await User.findOne({where: {id, email}});
            if (user.balance - total_price < 0)
                throw {name: 'NotEnoughBalance'};

            let category = await Category.findOne({
                where: {id: product.CategoryId},
            });
            let sold_product_amount = category.sold_product_amount + quantity;
            // Update all model
            await sequelize.transaction(async (t) => {
                category = await Category.update(
                    {
                        sold_product_amount,
                    },
                    {where: {id: product.CategoryId}},
                    {transaction: t}
                );
                product = await Product.update(
                    {stock: product.stock - quantity},
                    {
                        where: {id: ProductId},
                    },
                    {transaction: t}
                );
                user = await User.update(
                    {balance: user.balance - total_price},
                    {where: {id, email}},
                    {transaction: t}
                );

                const trx = await TransactionHistory.create(
                    {
                        ProductId,
                        quantity,
                        total_price,
                        UserId: id,
                    },
                    {transaction: t}
                );
            });

            res.status(201).json({
                message: 'You hava successfully purchase the product',
                transactionBill: {
                    total_price,
                    quantity,
                    product_name,
                },
            });
        } catch (err) {
            console.log(err)
            next(err);
        }
    }

    static async getTransactionHistory(req, res, next) {
        const UserId = req.user.id;
        try {
            const trxHis = await TransactionHistory.findAll({
                where: {UserId},
                attributes: {exclude: ['id']},
                include: {
                    model: Product,
                    attributes: {exclude: ['updatedAt', 'createdAt']},
                },
            });
            res.status(200).json({
                transactionHistories: trxHis,
            });
        } catch (err) {
            console.log(err)
            next(err);
        }
    }
    static async getAllTransaction(req, res, next) {
        try {
            const trxHis = await TransactionHistory.findAll({
                attributes: {exclude: ['id']},
                include: [
                    {
                        model: Product,
                        attributes: {exclude: ['updatedAt', 'createdAt']},
                    },
                    {
                        model: User,
                        attributes: {
                            exclude: ['updatedAt', 'createdAt', 'password'],
                        },
                    },
                ],
            });
            res.status(200).json({
                transactionHistories: trxHis,
            });
        } catch (err) {
            console.log(err);
            next(err);
        }
    }
    static async getOneTransaction(req, res, next) {
        const {transactionId} = req.params;
        const UserId = req.user.id;
        try {
            let trxHis;
            if (req.user.role == 'admin') {
                trxHis = await TransactionHistory.findOne({
                    where: {id: transactionId},
                    attributes: {exclude: ['id']},
                    include: {
                        model: Product,
                        attributes: {exclude: ['updatedAt', 'createdAt']},
                    },
                });
            } else if (req.user.role == 'customer') {
                trxHis = await TransactionHistory.findOne({
                    where: {id: transactionId, UserId},
                    attributes: {exclude: ['id']},
                    include: {
                        model: Product,
                        attributes: {exclude: ['updatedAt', 'createdAt']},
                    },
                });
                if (trxHis == null) throw {name: 'Unauthorized'};
            }
            res.status(200).json(trxHis);
        } catch (err) {
            console.log(err)
            next(err);
        }
    }
}

module.exports = TransactionController;
