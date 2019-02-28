const express = require('express');

const router = new express.Router();

router.get('/', (req, res) => {
	return res.render('index');
});

module.exports = router;
