const { User, Photo, Comment, Socialmedia } = require('../models/index');

async function authorizationUser(req, res, next){
    const { userId } = req.params;
    const authUser = req.user.id;
    try {
        const user = await User.findOne({ where: { id: userId } });
        if(!user) throw { name: 'ErrNotFound' };
        if(user.id === authUser){
            return next();
        }else{
            throw { name: 'Unauthorized' };
        }
    } catch (error) {
        next(error);
    }
}

async function authorizationAdmin(req, res, next){
    const role = req.user.role
    try {
        if(role !== 'admin') throw { name: 'unauthorized' };
        next()
    } catch (error) {
        next(error);
    }
}

module.exports = {
    authorizationUser,
    authorizationAdmin
};