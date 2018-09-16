const express = require('express');
const api     = require('../api');
const router  = express.Router();

router.get('/', (req, res, next) => {
    return res.json(api.getLines()); 
})

router.get('/lines', (req, res, next) => {
    return res.json(api.getLines());
});

router.get('/lines/:line', (req, res, next) => {
    const { line } = req.params;
    return res.json(api.getLines(line));
});

router.get('/stations', (req, res, next) => {
    return res.json(api.getStations());
});

router.get('/stations/:station', (req, res, next) => {
    const { station } = req.params;
    return res.json(api.getStations(station));
});

module.exports = router;