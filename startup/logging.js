require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');

module.exports = function() {
    process.on('unhandledRejection', ex => {
        throw ex;
    });

    winston.handleExceptions(
        new winston.transports.Console({ colorize: true, prettyPrint: true }),
        new winston.transports.File({ filename: 'uncaughtExceptions.log' })
    );

    winston.add(winston.transports.File, { filename: 'logfile.log' });
    winston.add(winston.transports.MongoDB, {
        db: 'mongodb://localhost/vidly'
    });
};
