const cheerio = require('cheerio');
const {
	exceptionCheck,
	getStationsHtml
} = require('./utils');

module.exports.parse = async () => {
	const html = await getStationsHtml();
	const $ = cheerio.load(html, {
		normalizeWhitespace: true
	});

	const linesArray = [];

	const tables = $('form').find('section table');
	tables.each((i, table) => {
		const lineObj = {};

		const stationsArray = [];

		const rows = $(table).find('tr');
		rows.each((j, row) => {
			if (j === 0) {
				return;
			}

			const stationObj = {id: j - 1};

			const cells = $(row).find('td');
			cells.each((k, cell) => {
				switch (k) {
					case 0:
						return;
					case 1: {
						const defaultName = $(cell).find('a').html().trim();
						const exception = exceptionCheck(defaultName);
						stationObj.name = exception ? exception : defaultName;
						break;
					}

					case 2:
						stationObj.distance = Number($(cell).html());
						break;
					case 3:
						stationObj.mobile = Number($(cell).html());
						break;
					default:
				}
			});

			stationsArray.push(stationObj);
		});

		lineObj.name = $(table).find('caption').html().trim();
		lineObj.id = i;
		lineObj.stations = stationsArray;
		linesArray.push(lineObj);
	});

	return linesArray;
};
