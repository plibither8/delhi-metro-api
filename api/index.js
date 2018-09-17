const rawLinesData = require('./data/lines.json');

const errorMsg = 'Error: Invalid query. Please try again.';

const searchStation = (arr, obj) => {
    for (const [i, el] of arr.entries()) {
        if (el.name === obj.name) {
            return i;
        }
    }
    return -1;
};

const returnLinesRequiredData = (lineObj, id, key) => {

    if (id) {
        if (id < lineObj.stations.length) {
            if (key) {
                if (lineObj.stations[id].hasOwnProperty(key)) {
                    return lineObj.stations[id][key];
                }
                return errorMsg;
            }
            return lineObj.stations[id];
        }
        return errorMsg;
    }
    return lineObj;

};

const populateLinesArray = () => {
    return rawLinesData.map(line => {
        const stationsArray = line.stations.map(station => getStations(station.name));
        return {
            name: line.name,
            id: line.id,
            stations: stationsArray
        };
    });
};

const lineNameValidity = (line) => {
    const linesArray = populateLinesArray();
    if (/^[a-zA-Z ]*$/i.test(line)) {
        for (let lineObj of linesArray) {
            if (lineObj.name.split(' ')[0].toLowerCase() === line.split(' ')[0].toLowerCase()
                || lineObj.name.toLowerCase().split(' ').join('') === line.toLowerCase().split(' ').join('')) {
                return lineObj;
            }
        }
        return -1;
    }
    else if (/^[0-9]+$/i.test(line)) {
        if (line < linesArray.length) {
            return linesArray[line];
        }
        return -1;
    }
    return -1;
};

const getLines = (lineName = null, id = null, key = null) => {

    const linesArray = populateLinesArray();

    if (lineName) {
        const line = lineNameValidity(lineName);
        if (line !== -1) {
            return returnLinesRequiredData(line, id, key);
        }
        return errorMsg;
    }

    return linesArray;

};

const getStations = (stationName = null, key = null) => {

    let stationsArray = [];

    rawLinesData.map(line => {

        const stations = line.stations;
        stations.map(station => {

            const searchResult = searchStation(stationsArray, station);
            if (searchResult > -1) {
                stationsArray[searchResult].lines.push({
                    name: line.name,
                    lineId: line.id,
                    stationId: station.id,
                    distance: station.distance
                });
            }
            else {
                let stationObj = {
                    name: station.name,
                    mobile: station.mobile,
                    lines: [
                        {
                            name: line.name,
                            lineId: line.id,
                            stationId: station.id,
                            distance: station.distance
                        }
                    ]
                };
                stationsArray.push(stationObj);
            }
        });

    });

    if (stationName) {
        for (let station of stationsArray) {
            if (station.name.split(' ').join('').toLowerCase() === stationName.split(' ').join('').toLowerCase()) {
                if (key) {
                    if (station.hasOwnProperty(key)) {
                        return station[key];
                    }
                    return errorMsg;
                }
                return station;
            }
        }
        return errorMsg;
    }

    stationsArray.sort((a, b) => a.name.localeCompare(b.name));
    return stationsArray;

};

const getLineList = () => {
    let lineNames = [];
    rawLinesData.map(line => lineNames.push(line.name));
    return lineNames;
};

const getStationList = (lineName = null) => {
    let stationNames = [];
    if (lineName) {
        const line = lineNameValidity(lineName);
        if (line !== -1) {
            getLines(line.name).stations.map(station => stationNames.push(station.name));
            return stationNames;
        }
        return errorMsg;
    }
    getStations().map(station => stationNames.push(station.name));
    return stationNames;
};

// const getRoute = (from, to) => {

//     const stationArray = getStations();

//     let from;

//     for (station of stationsArray) {
//         if (station.name === stationName || station.name.split(' ').join('').toLowerCase() === stationName) {
//             return station;
//         }
//     }

// };

const getMetaInfo = () => {
    return require('./data/meta.json');
};

module.exports.getLines       = getLines;
module.exports.getStations    = getStations;
module.exports.getLineList    = getLineList;
module.exports.getStationList = getStationList;
module.exports.getMetaInfo    = getMetaInfo;