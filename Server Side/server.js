const express = require("express");
const bodyParser = require("body-parser");
const mongo = require("mongodb");
const MongoClient = require("mongodb").MongoClient;
const db = require("./config/db");
const cors = require('cors');
const request = require('request');
const https = require("https");
const passport = require('passport');
const app = express();  
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
const port = process.env.port || 8000;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
MongoClient.connect(db.url,
    (err, database) => {
        if (err) {
            return console.log(err);
        }
        console.log("SUCCESS: Database connection established");
        database = database.db('mibfanclub');
        require("./app/routes")(app, database, request, mongo);
        require('./config/passport')(passport, database, mongo);

        app.listen(port, () => {
            console.log("Server is listening on port " + port);
        });
    }
);