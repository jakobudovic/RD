import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

// mongoose.connect('mongodb://localhost:27017/issues');
/*
mongoose.connect('');

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});
*/

// app.get('/', (req, res) => res.send("Hello world!"));
app.use('/', router);

var port = 4000;
app.listen(port, () => console.log('Express server is running on port', port, '\n'));


/*
const port = process.env.PORT || port;
const www = process.env.WWW || './';
app.use(express.static(www));
console.log(`serving ${www}`);
app.get('*', (req, res) => {
    res.sendFile(`index.html`, { root: www });
});
app.listen(port, () => console.log(`listening on http://localhost:${port}`));
*/