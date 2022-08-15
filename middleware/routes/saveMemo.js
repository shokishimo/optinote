const express = require('express');
const router = express.Router();
const saveMemoController = require('../controllers/saveMemoController');

router.get('/', saveMemoController.saveMemo);

module.exports = router;