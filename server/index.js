const express = require('express');
const path = require('path');
const api = require('./bracket/bracketIndex'); //bracket

const app = express();
const port = process.env.PORT || 3000;
const DIST_DIR = path.join(__dirname, '../client/dist');

app.use(express.json()); //bracket
app.use(express.static(DIST_DIR));

app.use('/api', api) //bracket

app.listen(port, function () {
 console.log('App listening on port: ' + port);
});