var Boom = require('boom');

var handlers = {
  list: function(ObjectModel, objectName) {
    return {
      method: 'GET', path: '/' + objectName + 's', handler: function (request, reply) {
        ObjectModel.find( function (err, users) {
          if (err) {
            return reply(Boom.badImplementation());
          }
          
          return reply(users);
        });
      }
    };
  },
  show: function(ObjectModel, objectName) {
    return {
      method: 'GET', path: '/' + objectName + 's/{objectId}', handler: function (request, reply) {
        ObjectModel.findById(request.params.objectId, function (err, object) {
          if (err) {
            return reply(Boom.badImplementation());
          }

          return reply(object);
        });
      }
    };
  },
  update: function(ObjectModel, objectName) {
    return {
      method: 'POST', path: '/' + objectName + 's', handler: function (request, reply) {
        var object = new ObjectModel();
        // object.firstname = request.payload.firstname || '';
        // object.lastname  = request.payload.lastname  || '';

        object.save(function (err) {
          if (err) {
            return reply(Boom.badImplementation());
          }
          
          return reply(object);
        });
      }
    };
  },
  patch: function(ObjectModel, objectName) {
    return {
      method: ['POST', 'PUT', 'PATCH'], path: '/' + objectName + 's/{objectId}', handler: function (request, reply) {
        ObjectModel.findById(request.params.objectId, function (err, object) {
          if (err) {
            return reply(Boom.notFound());
          }

          // if (request.payload.firstname) {
            // object.firstname = request.payload.firstname;
          // }

          // if (request.payload.lastname) {
            // object.lastname  = request.payload.lastname;  
          // }

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
  delete: function(ObjectModel, objectName) {
    return {
      method: ['DELETE'], path: '/' + objectName + 's/{objectId}', handler: function (request, reply) {
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
module.exports = {
  generate: function(route, ObjectModel) {

    return _.chain(handlers).pick(route.actions).map(function (handler) {
      return handler(ObjectModel, route.model.name);
    }).value();
  }
};
