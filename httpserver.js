var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/projects');
var projectSchema = require('./timeManagementSchemas.js').projectSchema;
var taskSchema = require('./timeManagementSchemas.js').taskSchema;
var timerSchema = require('./timeManagementSchemas.js').timerSchema;

var projectModel = mongoose.model('projectModel', projectSchema);
var taskModel = mongoose.model('taskModel', taskSchema);
var timerModel = mongoose.model('timerModel', timerSchema);

const history = require('connect-history-api-fallback');

mongoose.connection.once('open', function() {
    app.use(express.json());
    app.post('/newProjectItem', function(request, res) {
        var savePkg = request;
        console.log(savePkg.body.projectName);
        if (savePkg.body.projectName === undefined) {
            console.log("THE DATA IS EMPTY!");
        } else {
            var newProject = new projectModel({
                name: savePkg.body.projectName,
            });
            newProject.save(function (err, doc) {
                if (err) {
                    console.log("error saving to database " + err);
                    res.status(404);
                    res.send(JSON.stringify(err));
                } else {
                    console.log("saved successfully to database " + doc);
                    res.status(200);
                    res.send(JSON.stringify(doc));
                }
            });
        }
    });

    app.get('/allProjects', function (req, res) {
        var query = projectModel.find()
        query.exec(function(err, docs) {
            if(err) {
                console.log("error pulling from database " + err);
                res.status(404);
                res.send(JSON.stringify(err));
            } else {
                res.status(200);
                res.send(JSON.stringify(docs));
            }
        });
    });

    app.use(express.static('theAmazingProject/dist/theAmazingProject/'));
    app.use(history({
        disableDotRule: true,
        verbose: true
    }));
    app.use(express.static('theAmazingProject/dist/theAmazingProject/'));
    app.get('/', function(req, res) {
        res.render(path.join(__dirname + '/dist/index.html'));
    });

    app.listen(8080, (err) => {
        if(err) {
            console.log(err);
        } else {
            console.log("Application launched and running");
        }
    })
});