const { hash, compare } = require('../helpers/hash');
const { sign, verify } = require('../helpers/jwt');
const { User } = require('../models/index');
const convertRupiah = require('rupiah-format')

class UsersController {
    static async signUp(req, res, next){
        const { full_name, password, gender, email } = req.body;
        try {
            const userRes = await User.create(
                {
                    full_name,
                    email,
                    password,
                    gender,
                    role: 'customer',
                    balance
                }
            );
            res.status(201).json({
                user: {
                    id: userRes.id,
                    full_name: userRes.full_name,
                    email: userRes.email,
                    gender: userRes.gender,
                    balance: convertRupiah.convert(userRes.balance),
                    createdAt: userRes.createdAt
                }
            });
        } catch (err) {
            console.log(err)
            next(err);
        }
    }

    static async signIn(req, res, next){
        const { email, password } = req.body;
        try {
            if (!email || !password) throw { name: 'EmailOrPasswordEmpty' };
            const user = await User.findOne({ where: { email } });
            if(!user) throw { name: 'EmailNotFound' };
            if(!compare(password, hash(password))) throw { name: 'WrongPassword' };
            const token = sign({ id: user.id, email: user.email });
            res.status(200).json({ token });
        } catch (error) {
            console.log(error)
            next(error);
        }
    }
    static async update(req, res, next){
        const { email, full_name, username, profile_image_url, age, phone_number } = req.body;
        const { userId } = req.params;
        try {
            const user = await User.update(
                {
                    email: email,
                    full_name: full_name,
                    username: username,
                    profile_image_url: profile_image_url,
                    age: age,
                    phone_number: phone_number
                },
                {
                    where:{
                        id: userId
                    }
                }
            );
            res.status(200).json({
                "email": email,
                "full_name": full_name,
                "username": username,
                "profile_image_url": profile_image_url,
                "age": age,
                "phone_number": phone_number
            });
        } catch (error) {
            next(error);
        }
    }
    static async delete(req, res, next){
        const { userId } = req.params;
        try {
            const user = await User.destroy({ where: { id: userId } });
            res.status(200).json({
                "message": "Your account has been successfully deleted"
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = UsersController;