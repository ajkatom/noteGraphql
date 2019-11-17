const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/notetaking_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose;
