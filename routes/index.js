const router = require('express').Router();
const userRouter = require('./users-router');



const authMiddleware = require('../middlewares/authentication-middleware');
const errorMiddleware = require('../middlewares/error-middleware');
const UsersController = require('../controllers/users-controller');


router.post('/users/login', UsersController.signIn);
router.post('/users/register', UsersController.signUp);

router.use(authMiddleware);
router.use(userRouter);
// router.use('/photos', photosRouter);
// router.use('/comments', commentsRouter);


router.use(errorMiddleware);

module.exports = router;