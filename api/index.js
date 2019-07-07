const utils = require('./utils');

let rawLinesData;
require('./parser').parse().then(data => {
	rawLinesData = data;
});

const errorMsg = 'Error: Invalid query. Please try again.';

function searchStation(arr, obj) {
	for (const [i, el] of arr.entries()) {
		if (el.name === obj.name) {
			return i;
		}
	}

	return -1;
};

function returnLinesRequiredData(lineObj, id, key) {
	const {stations} = lineObj;

	if (!id) {
		return lineObj;
	}

	if (id >= stations.length) {
		return errorMsg;
	}

	if (!key) {
		return stations[id];
	}

	if (!(key in stations[id])) {
		return errorMsg;
	}

	return stations[id][key];
};

function populateLinesArray() {
	return rawLinesData.map(line => {
		const stationsArray = line.stations.map(station => getStations(station.name));
		return {
			name: line.name,
			id: line.id,
			stations: stationsArray
		};
	});
};

function lineNameValidityline() {
	const linesArray = populateLinesArray();
	if (/^[a-zA-Z ]*$/i.test(line)) {
		for (const lineObj of linesArray) {
			if (lineObj.name.split(' ')[0].toLowerCase() === line.split(' ')[0].toLowerCase() ||
				lineObj.name.toLowerCase().split(' ').join('') === line.toLowerCase().split(' ').join('')) {
				return lineObj;
			}
		}

		return -1;
	}

	if (/^\d+$/i.test(line)) {
		if (line < linesArray.length) {
			return linesArray[line];
		}

		return -1;
	}

	return -1;
};

function getLines(lineName = null, id = null, key = null) {
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

function getStations(stationName = null, key = null) {
	const stationsArray = [];

	rawLinesData.map(line => {
		const {stations} = line;
		stations.map(station => {
			const searchResult = searchStation(stationsArray, station);
			if (searchResult > -1) {
				stationsArray[searchResult].lines.push({
					name: line.name,
					lineId: line.id,
					stationId: station.id,
					distance: station.distance
				});
			} else {
				const stationObj = {
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

			return null;
		});
		return null;
	});

	if (stationName) {
		for (const station of stationsArray) {
			if (station.name.split(' ').join('').toLowerCase() === stationName.split(' ').join('').toLowerCase()) {
				if (key) {
					if ((key in station)) {
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

function getLineList() {
	const lineNames = [];
	rawLinesData.map(line => lineNames.push(line.name));
	return lineNames;
};

function getStationList(lineName = null) {
	const stationNames = [];
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

function getRoute(from, to) {
	const stationsArray = getStations();

	let fromStation;
	let toStation;

	for (const station of stationsArray) {
		if (station.name === from || station.name.split(' ').join('').toLowerCase() === from) {
			fromStation = station.name;
		}
	}

	for (const station of stationsArray) {
		if (station.name === to || station.name.split(' ').join('').toLowerCase() === to) {
			toStation = station.name;
		}
	}

	return utils.getRouteHtml(fromStation, toStation);
};

module.exports = {
	getLines,
	getStations,
	getLineList,
	getStationList,
	getRoute
};
