var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var GenericSchema = new Schema({
  // firstname: String,
  // lastname: String
});

module.exports = {
  generate: function (model) {
    return mongoose.model(model.name, GenericSchema);
  }
};