const express = require('express');
const router = express.Router();
const path = require('path');

// index
router.get('/(.html)?', (req, res) =>
{
    res.sendFile(path.join(__dirname, '..', '..', 'front_end', 'html', 'sign_up.html'));
});

module.exports = router;