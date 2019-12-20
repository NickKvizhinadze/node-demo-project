const winston = require("winston");
const mongoose = require("mongoose");

module.exports = function() {
  mongoose
    .connect("mongodb://mongo:27017/vidly")
    .then(() => winston.info("Connected to db..."));
};
