var Boom = require('boom');
var User = require('../models/user');

var handlers: {
  list: 
    method: 'GET', path: '/users', handler: function (request, reply) {
      User.find( function (err, users) {
        if (err) {
          return reply(Boom.badImplementation());
        }
        
        return reply(users);
      });
    }
  },

  show: {
    method: 'GET', path: '/users/{userId}', handler: function (request, reply) {
      User.findById(request.params.userId, function (err, user) {
        if (err) {
          return reply(Boom.badImplementation());
        }

        return reply(user);
      });
    }
  },
  
  update: {
    method: 'POST', path: '/users', handler: function (request, reply) {
      var user = new User();
      user.firstname = request.payload.firstname || '';
      user.lastname  = request.payload.lastname  || '';

      user.save(function (err) {
        if (err) {
          return reply(Boom.badImplementation());
        }
        
        return reply(user);
      });
    }
  },
  
  patch: {
    method: ['POST', 'PUT', 'PATCH'], path: '/users/{userId}', handler: function (request, reply) {
      User.findById(request.params.userId, function (err, user) {
          if (err) {
            return reply(Boom.notFound());
          }

          if (request.payload.firstname) {
            user.firstname = request.payload.firstname;
          }

          if (request.payload.lastname) {
            user.lastname  = request.payload.lastname;  
          }

          user.save(function (err) {
              if (err) {
                return reply(Boom.badImplementation());
              }

              return reply(user);
          });

      });
    }
  },
  
  delete: {
    method: ['DELETE'], path: '/users/{userId}', handler: function (request, reply) {
      User.findById(request.params.userId, function (err, user) {
          if (err) {
            return reply(Boom.notFound());
          }

          user.remove(function (err) {
              if (err) {
                return reply(Boom.notFound());
              }

              return reply(user);
          });
      });
    }
  }
};

module.exports = function render(route) {
  
}