const {hash, compare} = require('../helpers/hash');
const {sign} = require('../helpers/jwt');
const {User} = require('../models/index');
const convertRupiah = require('rupiah-format');

class UsersController {
    static async signUp(req, res, next) {
        const {full_name, password, gender, email} = req.body;
        try {
            const userRes = await User.create({
                full_name,
                email,
                password,
                gender,
                role: 'customer',
                balance: 0,
            });
            res.status(201).json({
                user: {
                    id: userRes.id,
                    full_name: userRes.full_name,
                    email: userRes.email,
                    gender: userRes.gender,
                    balance: convertRupiah.convert(userRes.balance),
                    createdAt: userRes.createdAt,
                },
            });
        } catch (err) {
            console.log(err)
            next(err);
        }
    }

    static async signIn(req, res, next) {
        const {email, password} = req.body;
        try {
            if (!email || !password) throw {name: 'EmailOrPasswordEmpty'};
            const user = await User.findOne({where: {email}});
            if (!user) throw {name: 'EmailNotFound'};
            if (!compare(password, hash(password)))
                throw {name: 'WrongPassword'};
            const token = sign({id: user.id, email: user.email, role: user.role});
            res.status(200).json({token});
        } catch (error) {
            console.log(error)
            next(error);
        }
    }
    static async update(req, res, next) {
        const {full_name, email} = req.body;
        const userId = req.params.userId;
        try {
            const user = await User.update(
                {
                    email,
                    full_name,
                },
                {
                    where: {
                        id: userId,
                    },
                    returning: true,
                    plain: true,
                }
            );
            res.status(200).json({
                user: {
                    id: user[1].id,
                    full_name: user[1].full_name,
                    email: user[1].email,
                    createdAt: user[1].createdAt,
                    updatedAt: user[1].updatedAt,
                },
            });
        } catch (error) {
            console.log(error)
            next(error);
        }
    }
    static async delete(req, res, next) {
        const {userId} = req.params;
        try {
            const user = await User.destroy({where: {id: userId}});
            res.status(200).json({
                message: 'Your account has been successfully deleted',
            });
        } catch (error) {
            console.log(error)
            next(error);
        }
    }
    static async topup(req, res, next) {
        const {balance} = req.body
        const userId = req.user.id;
        try {
            const user = await User.findOne({
                where: {id: userId},
                attributes: ['balance']
            });

            let balanceNow = balance + user.balance;
            await User.update(
                {balance: balanceNow},
                {where: {id: userId}}
            );
            balanceNow = convertRupiah.convert(balanceNow)
            res.status(200).json({
                message: 'Your balance has been successfully updated to ' + balanceNow,
            });
        } catch (err) {
            console.log(err)
            next(err);
        }
    }
}

module.exports = UsersController;
