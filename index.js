const { getLines, getStations } = require('./parser');

(async () => {
    console.log(await getStations((await getLines('Violet Line')).stations[0].name));
    console.log(await getLines('Violet Linse'));
})();