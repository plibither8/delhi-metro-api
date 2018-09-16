const express = require('express');

const app = express();

// Main routes handler
const home = require('./routes/index');
app.use('/', home);

// API routes handler
const apiRoute = require('./routes/api');
app.use('/api', apiRoute);

//Setting public directory
app.use(express.static(__dirname + '/public'));

//Setting view engine
app.set('view engine', 'pug');
app.set('views', __dirname + '/views/pages');

// Prettify JSON files when sending through res.json()
app.set('json spaces', 2);

app.listen(process.env.PORT || 5000);