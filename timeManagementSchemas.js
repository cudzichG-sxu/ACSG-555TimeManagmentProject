var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var projectSchema = new Schema({
    name: {type: String, required: true, unique: true},
}, {collection: 'projects'});

var taskSchema = new Schema({
    name: {type: String, required: true, unique: true},
    totalTime: {type: Number, required: true},
    projectId: {type: String, required: true},
}, {collection: 'tasks'});

var timerSchema = new Schema({
    date: {type: Date, required: true},
    taskId: {type: String, required: true},
}, {collection: 'timers'});

exports.projectSchema = projectSchema;
exports.taskSchema = taskSchema;
exports.timerSchema = timerSchema;