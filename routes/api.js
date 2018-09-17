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

router.get('/lines/:line/:id', (req, res) => {
    const { line, id } = req.params;
    return res.json(api.getLines(line, id));
});

router.get('/lines/:line/:id/:key', (req, res) => {
    const { line, id, key } = req.params;
    return res.json(api.getLines(line, id, key));
});

router.get('/stations', (req, res) => {
    return res.json(api.getStations());
});

router.get('/stations/:station', (req, res) => {
    const { station } = req.params;
    return res.json(api.getStations(station));
});

router.get('/stations/:station/:key', (req, res) => {
    const { station, key } = req.params;
    return res.json(api.getStations(station, key));
});

router.get('/list', (req, res) => {
    return res.json({ lines: api.getLineList(), stations: api.getStationList() });
});

router.get('/list/lines', (req, res) => {
    return res.json(api.getLineList());
});

router.get('/list/stations', (req, res) => {
    return res.json(api.getStationList());
});

router.get('/list/stations/:line', (req, res) => {
    const { line } = req.params;
    return res.json(api.getStationList(line));
});

router.get('/route/:from/:to', (req, res) => {
    const { from, to } = req.params;
    return res.json(api.getRoute(from, to));
});

module.exports = router;