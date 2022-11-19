const router = require('express').Router();
const CategoryController = require('../controllers/category-controller');
const {authorizationAdmin} = require('../middlewares/authorization-middleware');

router.post('/categories', authorizationAdmin, CategoryController.create);
router.get('/categories', authorizationAdmin, CategoryController.getAll);
router.patch('/categories/:categoryId', authorizationAdmin, CategoryController.update);
router.delete('/categories/:categoryId', authorizationAdmin, CategoryController.delete);

module.exports = router;
