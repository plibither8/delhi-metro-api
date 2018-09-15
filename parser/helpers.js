const request        = require('request-promise');
const fs             = require('fs');
const path           = require('path');
const { promisify }  = require('util');

const writeFile      = promisify(fs.writeFile);

const delhiMetroInfoUrl = 'https://delhimetrorail.info/delhi-metro-stations';

module.exports.writeToJson = async (data) => {
    await writeFile(path.join(__dirname, '../data.json'), JSON.stringify(data, null, '  '), 'utf8', (err) => {
        if (err) {
            throw err;
        }
    });
};

module.exports.getHtml = async () => {
    let html;
    await request(delhiMetroInfoUrl, (err, status, body) => {
        html = body;
        if (err) {
            throw err;
        };
    });
    return html;
};

module.exports.exceptionCheck = (name) => {
    if (name === 'Janakpuri West') {
        return 'Janak Puri West';
    }
    return null;
};