import { Meteor } from 'meteor/meteor';

var AWS = require('aws-sdk');
var uuid = require('uuid');
var ffmpeg = require('ffmpeg');


Meteor.startup(() => {
    console.log("Startup Successful");
  // code to run on server at startup
});
