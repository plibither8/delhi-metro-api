const express = require('express');
const subdomain = require('express-subdomain');

const app = express();

// API routes handler
const apiRoute = require('./routes/api');
app.use(subdomain('api', apiRoute));

// Main routes handler
const home = require('./routes/index');
app.use('/', home);

//Setting public directory
app.use(express.static(__dirname + '/public'));

//Setting view engine
app.set('view engine', 'pug');
app.set('views', __dirname + '/views/pages');

// Prettify JSON files when sending through res.json()
app.set('json spaces', 2);

app.listen(process.env.PORT || 3000);