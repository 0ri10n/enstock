const { Router } = require('express');
const { getCategories, createCategory } = require('../controllers/categoryController');
const authMiddleware = require('../middlewares/authMiddleware');
const { authorizeRoles } = require('../middlewares/roleMiddleware');

const router = Router();

router.get('/', authMiddleware, getCategories);
router.post('/', authMiddleware, authorizeRoles('ADMIN'), createCategory);

module.exports = router;