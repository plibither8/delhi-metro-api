const request        = require('request-promise');
const fs             = require('fs');
const path           = require('path');
const { promisify }  = require('util');

const writeFile      = promisify(fs.writeFile);

const delhiMetroInfoBaseUrl = 'https://delhimetrorail.info';

const getHtml = async (url) => {
    let html;
    await request(url, (err, status, body) => {
        html = body;
        if (err) {
            throw err;
        }
    });
    return html;
};

module.exports.getStationsHtml = async () => {
    const html = await getHtml(`${delhiMetroInfoBaseUrl}/delhi-metro-stations`);
    return html;
};

// module.exports.getRouteHtml = async (from, to) => {
//     const kebab = str => str.toLowerCase().split(' ').join('-');
//     const html = await getHtml(`${delhiMetroInfoBaseUrl}/${kebab(from)}-delhi-metro-station-to-${kebab(to)}-delhi-metro-station`);
//     console.log(html);
//     return html;
// };

module.exports.writeToJson = async (object, fileName) => {
    await writeFile(path.join(__dirname, `../data/${fileName}`), JSON.stringify(object, null, '  '), 'utf8', (err) => {
        if (err) {
            throw err;
        }
    });
};

module.exports.exceptionCheck = (name) => {
    if (name === 'Janakpuri West') {
        return 'Janak Puri West';
    }
    return null;
};