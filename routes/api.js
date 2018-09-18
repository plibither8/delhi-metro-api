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

router.get('/list/:option(lines|stations)?/:line?', (req, res) => {
    const { option, line } = req.params;
    if (line) {
        return res.json(api.getStationList(line));
    }
    switch (option) {
        case undefined  : return res.json({ lines: api.getLineList(), stations: api.getStationList() });
        case 'lines'    : return res.json(api.getLineList());
        case 'stations' : return res.json(api.getStationList());
    }
});

router.get('/route/:from/:to', (req, res) => {
    const { from, to } = req.params;
    return res.json(api.getRoute(from, to));
});

module.exports = router;