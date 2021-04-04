'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var TaskSchema = new Schema({
  data: {
    type: String,
    required: 'Kindly enter the name of the task'
  },
  temp: {
    type: Number,
    default: 0
  },
  humid: {
    type: Number,
    default: 0
  },
  laitude: {
    type: Number,
    default: 10.773839
  },
  longitude: {
    type: Number,
    default: 106.660996
  },

  Created_date: {

    type: Number,
    default: function(){return new Date().getTime()}
  },

});


module.exports = mongoose.model('Tasks', TaskSchema);
