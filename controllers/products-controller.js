const {Product, Category} = require('../models/index');
const convertRupiah = require('rupiah-format');

class ProductController {
    static async create(req, res, next) {
        const {title, price, stock, CategoryId} = req.body;
        try {
            const product = await Product.create({
                title,
                price,
                stock,
                CategoryId,
            });
            product.price = convertRupiah.convert(product.price);
            res.status(201).json({
                product,
            });
        } catch (err) {
            console.log(err)
            next(err);
        }
    }

    static async getAll(req, res, next) {
        try {
            let products = await Product.findAll();
            products.forEach((e, i) => {
                products[i].price = convertRupiah.convert(e.price);
            });
            res.status(200).json({
                products,
            });
        } catch (err) {
            console.log(err)
            next(err);
        }
    }

    static async update(req, res, next) {
        const {price, stock, title} = req.body;
        const productId = req.params.productId;
        try {
            const product = await Product.update(
                {
                    price,
                    stock,
                    title,
                },
                {
                    where: {
                        id: productId,
                    },
                    returning: true,
                    plain: true,
                }
            );
            product[1].price = convertRupiah.convert(product[1].price);
            res.status(200).json({
                product: product[1],
            });
        } catch (err) {
            console.log(err)
            next(err);
        }
    }
    static async updateCategory(req, res, next) {
        const productId = req.params.productId;
        const {CategoryId} = req.body;
        try {
            const category = await Category.findOne({where: {id: CategoryId}});
            if (!category) throw {name: "BadRequest"}
            const product = await Product.update(
                {
                    CategoryId,
                },
                {where: {id: productId}, returning: true, plain: true}
            );
            product[1].price = convertRupiah.convert(product[1].price);
            res.status(200).json({
                product: product[1],
            });
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    static async delete(req, res, next) {
        const productId = req.params.productId;
        try {
            await Product.destroy({where: {id: productId}});
            res.status(200).json({
                message: 'Product has been successfully deleted',
            });
        } catch (err) {
            console.log(err)
            next(err);
        }
    }
}
module.exports = ProductController;
