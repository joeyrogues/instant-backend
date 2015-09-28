var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var typeEval = {
  "String": String
}

var _ = require('underscore');

var specificModel = function (attributes) {
  return new Schema(
    _.mapObject(attributes, function (val, key) {
      return typeEval[val];
    })
  );
};

module.exports = {
  generate: function (model) {
    return mongoose.model(model.name, specificModel(model.attributes));
  }
};