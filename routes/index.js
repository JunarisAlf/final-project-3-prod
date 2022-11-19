const router = require('express').Router();
const userRouter = require('./users-router');
const categoryRouter = require('./category-router');
const productRouter = require('./product-router');
const transactiontRouter = require('./transaction-router');






const authMiddleware = require('../middlewares/authentication-middleware');
const errorMiddleware = require('../middlewares/error-middleware');
const UsersController = require('../controllers/users-controller');


router.post('/users/login', UsersController.signIn);
router.post('/users/register', UsersController.signUp);

router.use(authMiddleware);
router.use(userRouter);
router.use(categoryRouter);
router.use(productRouter);
router.use(transactiontRouter);

router.use(errorMiddleware);

module.exports = router;