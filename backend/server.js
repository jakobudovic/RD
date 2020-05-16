import express from 'express';

const app = express();
app.get('/', (req, res) => res.send("Hello world!"));
var port = 4000;
app.listen(port, () => console.log('Express server is running on port', port));


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