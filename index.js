var _ = require('underscore');

 // Connecting Mongo
var mongoose   = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/test');

// Running Hapi
var Hapi = require('hapi');
var server = new Hapi.Server();
server.connection({ port: 3000 });

var config = require("./config.json");

var genericRoute = require('./generic_route');
var genericModel = require('./generic_model');
_.each(config.routes, function (route) {

  server.route(
    genericRoute.generate(route, genericModel.generate(route.model))
  );
});

server.start(function () {
  console.log('Server running at:', server.info.uri);
});