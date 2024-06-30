const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/category.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/', authMiddleware.verifyToken, categoriesController.create);
router.get('/', categoriesController.findAll);

module.exports = router;
