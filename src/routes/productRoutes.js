const { Router } = require('express');
const { getProducts, createProduct } = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');
const { authorizeRoles } = require('../middlewares/roleMiddleware');

const router = Router();

router.get('/', authMiddleware, getProducts);
router.post('/', authMiddleware, authorizeRoles('ADMIN'), createProduct);

module.exports = router;