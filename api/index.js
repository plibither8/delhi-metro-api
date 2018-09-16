const linesArray = require('./data/lines.json');

const search = (arr, obj) => {
    for (const [i, el] of arr.entries()) {
        if (el.name === obj.name) {
            return i;
        }
    }
    return -1;
};

const getLines = (line = null) => {
    if (line) {
        for (let lineObj of linesArray) {
            if (lineObj.name === line || lineObj.name.split(' ')[0].toLowerCase() === line) {
                return lineObj;
            }
        }
        return null;
    }
    return linesArray;
};

const getStations = (stationName = null) => {

    let stationsArray = [];

    linesArray.map(line => {
        
        const stations = line.stations;
        stations.map(station => {

            const searchResult = search(stationsArray, station);
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
            if (station.name === stationName || station.name.split(' ').join('').toLowerCase() === stationName) {
                return station;
            }
        }
        return null;
    }

    stationsArray.sort((a, b) => a.name.localeCompare(b.name));
    return stationsArray;

};

// const getRoutes = (from, to) => {

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

module.exports.getLines    = getLines;
module.exports.getStations = getStations;
module.exports.getMetaInfo = getMetaInfo;