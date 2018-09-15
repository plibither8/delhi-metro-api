const cheerio = require('cheerio');
const {
    getHtml,
    exceptionCheck,
    search
}             = require('./helpers');

const getLines = async (line = null) => {

    const html = await getHtml();
    const $ = cheerio.load(html, {
        normalizeWhitespace: true   
    });

    let linesArray = [];

    const tables = $('form').find('section table');
    tables.each((i, table) => {

        let lineObj = {},
            stationsArray = [];

        const rows = $(table).find('tr');
        rows.each((i, row) => {
            
            if (i === 0) {
                return;
            }
            
            let stationObj = { id: i };

            const cells = $(row).find('td');
            cells.each((j, cell) => {
                switch (j) {
                    case 0:
                        return;
                    case 1:
                        const defaultName = $(cell).find('a').html().trim();
                        const exception = exceptionCheck(defaultName);
                        stationObj.name = exception ? exception : defaultName;
                        break;
                    case 2:
                        stationObj.distance = Number($(cell).html());
                        break;
                    case 3:
                        stationObj.mobile = Number($(cell).html().trim());
                        break;
                }
            });

            stationsArray.push(stationObj);

        });

        lineObj.name = $(table).find('caption').html().trim();
        lineObj.stations = stationsArray;
        linesArray.push(lineObj);

    });
    
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

const getStations = async (stationName = null) => {

    const linesArray = await getLines();
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

module.exports.getLines = getLines;
module.exports.getStations = getStations;