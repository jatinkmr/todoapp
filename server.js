const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const ports = require('./port.js');
const db = require("./db");
const path = require('path');

const collection = "todo";

app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get("/getTodos", (req, res) => {
    db.getDB().collection(collection).find({}).toArray((err, documents) => {
        if(err) {
            console.log(err);
        } else {
            console.log(documents);
            res.json(documents);
        }
    });
});


db.connect((err) => {
    if(err) {
        console.log("Unable to connect with DataBase");
        process.exit(1);
    } else {
        app.listen(ports.port, () => {
            console.log(`DataBase Connected and Server started at ${ports.port}`);        
        })
    }    
});