const express = require('express');
const router = express.Router();
const path = require('path');

// index
router.get('^/$|/index(.html)?', (req, res) =>
{
    res.sendFile(path.join(__dirname, '..', '..', 'front_end', 'html', 'index.html'));
});

module.exports = router;
