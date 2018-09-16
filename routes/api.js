const express  = require('express');
const api      = require('../api');
const router   = express.Router();

router.get('/', (req, res) => {
    return res.json(api.getMetaInfo()); 
});

router.get('/lines', (req, res) => {
    return res.json(api.getLines());
});

router.get('/lines/:line', (req, res) => {
    const { line } = req.params;
    return res.json(api.getLines(line));
});

router.get('/stations', (req, res) => {
    return res.json(api.getStations());
});

router.get('/stations/:station', (req, res) => {
    const { station } = req.params;
    return res.json(api.getStations(station));
});

router.get('/route/:from/:to', (req, res) => {
    const { from, to } = req.params;
    return res.json(api.getRoute(from, to));
});

module.exports = router;