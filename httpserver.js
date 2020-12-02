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

    app.post('/newProjectItem', function(request, response) {
        var savePkg = request;
        console.log(savePkg.body.name);
       if (savePkg.body.name === undefined) {
            console.log("THE DATA IS EMPTY!");
      } else {
            var newProject = new projectModel({
                name: savePkg.body.name,
            });
           newProject.save(function (err, doc) {
                if (err) {
                    console.log("error saving to database " + err);
                    response.status(404);
                    response.send(JSON.stringify(err));
                } else {
                    console.log("saved successfully to database " + doc);
                  response.status(200);
                    response.send(JSON.stringify(doc));
                }
          });
       }
    });

    app.get('/allProjects', function (req, res) {
        var projectQuery = projectModel.find()
        projectQuery.exec(function(err, docs) {
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

    app.use('/deleteProject', express.query());
    app.delete('/deleteProject', function(request, response) {
        var deletePkg = projectModel.deleteOne({_id: request.query.id});
        console.log(request.query);
        deletePkg.exec(function(err) {
            if(err) {
                console.log("error deleting from database" + err);
                response.status(404);
                response.send(JSON.stringify(err));
            } else {
                response.status(202);
                response.send(JSON.stringify({}));
            }
        })
    });


    app.use(express.json());
    app.post('/newTaskItem', function(request, response) {
        var savePkg = request;
        console.log(savePkg.body);
        if (savePkg.body.name === undefined) {
            console.log("THE DATA IS EMPTY!");
        } else {
            var newTask = new taskModel({
                name: savePkg.body.name,
                totalTime: 0.00,
                projectId: savePkg.body.projectId
            });
            newTask.save(function (err, doc) {
                if (err) {
                    console.log("error saving to database " + err);
                    response.status(404);
                    response.send(JSON.stringify(err));
                } else {
                    console.log("saved successfully to database " + doc);
                    response.status(200);
                    response.send(JSON.stringify(doc));
                }
            });
        }
    });

    app.get('/allTaskItems', function (req, res) {
        var projectIdActual = req.query.projectId;
        console.log("HERE IS THE PROJECT ID " + projectIdActual);
        var taskQuery = taskModel.find({ projectId: { $eq: projectIdActual } })
        taskQuery.exec(function(err, docs) {
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

    app.use('/deleteTask', express.query());
    app.delete('/deleteTask', function(request, response) {
        var deletePkg = taskModel.deleteOne({_id: request.query.id});
        console.log(request.query);
        deletePkg.exec(function(err) {
            if(err) {
                console.log("error deleting from database" + err);
                response.status(404);
                response.send(JSON.stringify(err));
            } else {
                response.status(202);
                response.send(JSON.stringify({}));
            }
        })
    });



    //begin block of code to stop the CANNOT GET/ errors when refreshing a page
    app.use(express.static('theAmazingProject/dist/theAmazingProject/'));
    app.use(history({
        disableDotRule: true,
        verbose: true
    }));
    app.use(express.static('theAmazingProject/dist/theAmazingProject/'));
    app.get('/', function(req, res) {
        res.render(path.join(__dirname + '/dist/index.html'));
    });
    //end block of code

    app.listen(8080, (err) => {
        if(err) {
            console.log(err);
        } else {
            console.log("Application launched and running");
        }
    })
});
