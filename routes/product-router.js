const router = require('express').Router();
const ProductController = require('../controllers/products-controller');
const {authorizationAdmin} = require('../middlewares/authorization-middleware');

router.get('/products' ,ProductController.getAll);
router.post('/products', authorizationAdmin, ProductController.create);
router.put('/products/:productId', authorizationAdmin, ProductController.update);
router.patch('/products/:productId', authorizationAdmin, ProductController.updateCategory);
router.delete('/products/:productId', authorizationAdmin, ProductController.delete);

module.exports = router;