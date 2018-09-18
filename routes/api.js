const express  = require('express');
const api      = require('../api');
const router   = express.Router();

router.get('/', (req, res) => {
    return res.json(api.getMetaInfo()); 
});

router.get('/lines/:line?/:id?/:key?', (req, res) => {
    const { line, id, key } = req.params;
    return res.json(api.getLines(line, id, key));
});

router.get('/stations/:station?/:key?', (req, res) => {
    const { station, key } = req.params;
    return res.json(api.getStations(station, key));
});

router.get('/list', (req, res) => {
    return res.json({ lines: api.getLineList(), stations: api.getStationList() });
});

router.get('/list/lines', (req, res) => {
    return res.json(api.getLineList());
});

router.get('/list/stations/:line?', (req, res) => {
    const { line } = req.params;
    return res.json(api.getStationList(line));
});

router.get('/route/:from/:to', (req, res) => {
    const { from, to } = req.params;
    return res.json(api.getRoute(from, to));
});

module.exports = router;