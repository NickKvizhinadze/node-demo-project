var winston = require('winston');
var express = require('express');
var app = express();

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();
require('./startup/prod')(app);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    winston.info(`Listening port ${port}...`);
});
