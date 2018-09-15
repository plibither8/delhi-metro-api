const express = require('express');

const app = express();

// //Setting public directory
// app.use(express.static(__dirname + '/public'));

// //Setting view engine
// app.set('view engine', 'pug');
// app.set('views', __dirname + '/views/pages');

app.set('json spaces', 2);

const home = require('./routes/index');
app.use('/', home);

app.listen(process.env.PORT || 5000);