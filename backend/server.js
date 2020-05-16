import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const MongoClient = require('mongodb').MongoClient;


// import our Task schema
import Task from './models/task';

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

// ------------------------------------------------------------------------------------------------
// connecting to mongoDB
const uri = 'mongodb+srv://userJakob:pass@websitecluster-jrc1w.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect(uri)
const connection = mongoose.connection;

connection.once('open', () => {
    console.log('\nMongoDB database connection established successfully!\n');
});

// 
/*
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("MyFirstDB").collection("tasks");
  // perform actions on the collection object
  console.log("Connected to a mongoDB\n");
  // client.close();
});
listDatabases(client);
*/

// Retrieve all tasks
router.route('/tasks').get((req, res) => {
    Task.find((err, tasks) => {
        if (err)
            console.log(err);
        else
            res.json(tasks);
    });
});

// Retrieve one specific task by id
router.route('/tasks/:id').get((req, res) => {
    Task.findById(req.params.id, (err, task) => {
        if (err)
            console.log(err);
        else
            res.json(task);
    });
});

// Post a new task
router.route('/tasks/add').post((req, res) => {
    let task = new Task(req.body);
    task.save()
        .then(task => {
            res.status(200).json({'task': 'Added successfully'});
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
});


// Update existing task via post method
router.route('/tasks/update/:id').post((req, res) => {
    Task.findById(req.params.id, (err, task) => {
        if (!task)
            return next(new Error('Could not load document'));
        else {
            task.title = req.body.title;
            task.description = req.body.description;
            task.date = req.body.date;
            task.important = req.body.important;

            // saving task
            task.save().then(task => {
                res.json('Update done');
            }).catch(err => {
                res.status(400).send('Update failed');
            });
        }
    });
});

// Delete certain task, found by id
router.route('/tasks/delete/:id').get((req, res) => {
    Task.findByIdAndRemove({_id: req.params.id}, (err, task) => {
        if (err)
            res.json(err);
        else
            res.json('Remove successfully');
    })
})

app.use('/', router);


var port = 4000;
app.listen(port, () => console.log(`Express server is running on port ${port}.\n`));


function listDatabases(client){
    databasesList = client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};