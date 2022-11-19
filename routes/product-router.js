const router = require('express').Router();
const ProductController = require('../controllers/products-controller');
const {authorizationIsAdmin} = require('../middlewares/authorization-middleware');

router.get('/products' ,ProductController.getAll);
router.post('/products', authorizationIsAdmin, ProductController.create);
router.put('/products/:productId', authorizationIsAdmin, ProductController.update);
router.patch('/products/:productId', authorizationIsAdmin, ProductController.updateCategory);
router.delete('/products/:productId', authorizationIsAdmin, ProductController.delete);

module.exports = router;