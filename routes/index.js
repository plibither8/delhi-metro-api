const express = require('express');
const api     = require('../api');
const router  = express.Router();

router.get('/', (req, res, next) => {
    res.json(api.getLines()); 
});

module.exports = router;