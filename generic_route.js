var Boom = require('boom');

var handlers = {
  list: function (ObjectModel, model) {
    return {
      method: 'GET', path: '/' + model.name + 's', handler: function (request, reply) {
        ObjectModel.find( function (err, objects) {
          if (err) {
            return reply(Boom.badImplementation());
          }
          
          return reply(objects);
        });
      }
    };
  },
  show: function (ObjectModel, model) {
    return {
      method: 'GET', path: '/' + model.name + 's/{objectId}', handler: function (request, reply) {
        ObjectModel.findById(request.params.objectId, function (err, object) {
          if (err) {
            return reply(Boom.badImplementation());
          }

          return reply(object);
        });
      }
    };
  },
  create: function (ObjectModel, model) {
    return {
      method: 'POST', path: '/' + model.name + 's', handler: function (request, reply) {
        var object = new ObjectModel();
        
        _.each(_.keys(model.attributes), function (attribute) {
          if (request.payload[attribute]) {
            object[attribute] = request.payload[attribute]
          }
        });

        object.save(function (err) {
          if (err) {
            return reply(Boom.badImplementation());
          }
          
          return reply(object);
        });
      }
    };
  },
  update: function (ObjectModel, model) {
    return {
      method: ['POST'], path: '/' + model.name + 's/{objectId}', handler: function (request, reply) {
        ObjectModel.findById(request.params.objectId, function (err, object) {
          if (err) {
            return reply(Boom.notFound());
          }

          _.each(_.keys(model.attributes), function (attribute) {
            object[attribute] = undefined;

            if (request.payload[attribute]) {
              object[attribute] = request.payload[attribute]
            }
          });

          object.save(function (err) {
              if (err) {
                return reply(Boom.badImplementation());
              }

              return reply(object);
          });

        });
      }
    };
  },
  patch: function (ObjectModel, model) {
    return {
      method: ['PUT', 'PATCH'], path: '/' + model.name + 's/{objectId}', handler: function (request, reply) {
        ObjectModel.findById(request.params.objectId, function (err, object) {
          if (err) {
            return reply(Boom.notFound());
          }

          _.each(_.keys(model.attributes), function (attribute) {
            if (request.payload[attribute]) {
              object[attribute] = request.payload[attribute]
            }
          });

          object.save(function (err) {
              if (err) {
                return reply(Boom.badImplementation());
              }

              return reply(object);
          });

        });
      }
    };
  },
  delete: function (ObjectModel, model) {
    return {
      method: ['DELETE'], path: '/' + model.name + 's/{objectId}', handler: function (request, reply) {
        ObjectModel.findById(request.params.objectId, function (err, object) {
          if (err) {
            return reply(Boom.notFound());
          }

          object.remove(function (err) {
              if (err) {
                return reply(Boom.notFound());
              }

              return reply(object);
          });
        });
      }
    };
  }
};

var _ = require('underscore');
var genericModel = require('./generic_model');

module.exports = {
  generate: function (route) {
    var ObjectModel = genericModel.generate(route.model);

    return _.chain(handlers).pick(route.actions).map(function (handler) {
      return handler(ObjectModel, route.model);
    }).value();
  }
};
