const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const ports = require('./port.js');
const db = require("./db");

const collection = "todo";

app.use(bodyParser.json());

db.connect((err) => {
    if(err) {
        console.log("Unable to connect with DataBase");
        process.exit(1);
    } else {
        app.listen(ports.port, () => {
            console.log(`DataBase Connecgted and Server started at ${ports.port}`);        
        })
    }    
});