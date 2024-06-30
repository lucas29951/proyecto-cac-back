const express = require('express');
const router = express.Router();
const ticketsController = require('../controllers/ticket.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/', authMiddleware.verifyToken, ticketsController.create);
router.get('/:userId', authMiddleware.verifyToken, ticketsController.findByUserId);

module.exports = router;
