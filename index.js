const linesArray = require('./data.json');

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
        for (lineObj of linesArray) {
            if (lineObj.name === line) {
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
                stationsArray[searchResult].lines.push({ name: line.name, id: station.id });
            }
            else {
                let stationObj = {
                    name: station.name,
                    mobile: station.mobile,
                    lines: [
                        {
                            name: line.name,
                            id: station.id
                        }
                    ]
                };
                stationsArray.push(stationObj);
            }
        });

    });

    if (stationName) {
        for (station of stationsArray) {
            if (station.name === stationName) {
                return station;
            }
        }
        return null;
    }

    stationsArray.sort((a, b) => a.name.localeCompare(b.name));
    return stationsArray;

};

(async () => {
    console.log(getStations((getLines('Violet Line')).stations[0].name));
})();

module.exports.getLines    = getLines;
module.exports.getStations = getStations;