const router = require('express').Router();
const CategoryController = require('../controllers/category-controller');
const {authorizationIsAdmin} = require('../middlewares/authorization-middleware');

router.post('/categories', authorizationIsAdmin, CategoryController.create);
router.get('/categories', authorizationIsAdmin, CategoryController.getAll);
router.patch('/categories/:categoryId', authorizationIsAdmin, CategoryController.update);
router.delete('/categories/:categoryId', authorizationIsAdmin, CategoryController.delete);

module.exports = router;
