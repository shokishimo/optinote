const express = require('express');
const router = express.Router();
const path = require('path');

// 404
router.all('*', (req, res) =>
{
    res.status(404);
    if (req.accepts('html'))
    {
        res.sendFile(path.join(__dirname, '..', 'front_end', 'html', '404.html'));
    }
    else if (req.accepts('json'))
    {
        res.json({ error: "404 Not Found"});
    }
    else
    {
        res.type('txt').send("404 Not Found");
    }
});

module.exports = router;
