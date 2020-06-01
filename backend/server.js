import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const app = express();

// connecting to mongoDB
const URI = 'mongodb+srv://userJakob:coolpass@websitecluster-jrc1w.mongodb.net/MyFirstDB?retryWrites=true&w=majority';

mongoose.connect(URI, { useUnifiedTopology: true, useNewUrlParser: true });

const connection = mongoose.connection;

connection.once('open', () => {
	console.log('MongoDB database connection established successfully!\n');
});

app.use(cors());
app.use(bodyParser.json());
app.use(express.json({ extended: false }));
app.use('/', require('./API/Task'));

const port = 4000;
app.listen(port, () => console.log(`Express server is running on port ${port}.\n`));
