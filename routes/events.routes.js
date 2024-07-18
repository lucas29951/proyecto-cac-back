const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/events.controller');
const authMiddleware = require('../middleware/auth.middleware');
const upload = require('../config/multer.config');

router.post('/', authMiddleware.verifyToken, upload.single('imagen'), eventsController.create);
router.get('/', eventsController.findAll);
router.get('/:id', eventsController.findOne);
router.put('/:id', authMiddleware.verifyToken, upload.single('imagen'), eventsController.update);
router.delete('/:id', authMiddleware.verifyToken, eventsController.delete);

module.exports = router;
