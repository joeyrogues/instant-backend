



var mongoose   = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/test');

var InstantBackend = require('./instant-backend');

InstantBackend
.config({ port: 3000, routes: { cors: true } })
.routing(require("./config.json"))
.start(function () {
  console.log('Server running');
})