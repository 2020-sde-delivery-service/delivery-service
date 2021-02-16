const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const app = express();

dotenv.config();

const shipmentRoutes = require('./routes/shipmentRoutes');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

var port = process.env.PORT || process.env.SERVER_PORT;

//app.get('/', (req, res) => res.send('Hello World with Express'));

app.use('/api/v1', shipmentRoutes);

var server = app.listen(port, function () {
    console.log("Running ApiServer on port " + port);
});