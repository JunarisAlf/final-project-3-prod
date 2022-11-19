const { Category, Product} = require('../models/index');

class CategoryController{
    static async create(req, res, next){
        const {type} = req.body;
        try{
            const category = await Category.create({
                type,
                sold_product_amount: 0
            });
            res.status(201).json({
                category
            })
        }catch(err){
            console.log(err)
            next(err)
        }
    }

    static async getAll(req, res, next){
        try{
            const categories = await Category.findAll({
                include: Product,
            });
            res.status(200).json({
                categories
            })
        }catch(err){
            console.log(err)
            next(err)
        }
    }

    static async update(req, res, next){
        const {type} = req.body;
        const categoryId = req.params.categoryId;
        try{
            const category = await Category.update({
                type
            },
            {
                where:{
                    id: categoryId
                },
                returning: true,
                plain: true
            });
            res.status(200).json({
                category: category[1]
            })
        }catch(err){
            console.log(err)
            next(err)
        }
    }

    static async delete(req, res, next){
        const categoryId = req.params.categoryId;
        try{
            await Category.destroy({ where: { id: categoryId}});
            res.status(200).json({
                message: "Category has been successfully deleted"
            });
        }catch(err){
            console.log(err)
            next(err)
        }
    }
}

module.exports = CategoryController;