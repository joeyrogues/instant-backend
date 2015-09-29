var _ = require('underscore');
var Hapi = require('hapi');
var genericRoute = require('./generic_route');

var server = new Hapi.Server();

var backend = {
  config: function (config) {
    server.connection(config);

    return backend;
  },
  start: function (callback) {
    server.start(callback);

    return backend;
  },
  routing: function (config) {
    _.each(config.routes, function (route) {
      server.route(genericRoute.generate(route));
    });

    return backend;
  }
};

module.exports = backend;