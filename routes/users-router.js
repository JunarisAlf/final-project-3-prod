const router = require('express').Router();
const UsersController = require('../controllers/users-controller');
const {authorizationUser} = require('../middlewares/authorization-middleware');


router.put('/users/:userId', authorizationUser, UsersController.update);
router.delete('/users/:userId',authorizationUser, UsersController.delete);
router.patch('/users/topup', UsersController.topup)
module.exports = router;