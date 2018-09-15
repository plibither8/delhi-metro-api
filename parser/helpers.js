const request = require('request-promise');

const delhiMetroInfoUrl = 'https://delhimetrorail.info/delhi-metro-stations';

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

module.exports.search = (arr, obj) => {
    for (const [i, el] of arr.entries()) {
        if (el.name === obj.name) {
            return i;
        }
    }
    return -1;
};