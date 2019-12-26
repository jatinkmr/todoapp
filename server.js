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


app.put("/:id", (req, res) => {
    const todoID = req.params.id;
    const userInput = req.body;

    db.getDB().collection(collection).findOneAndUpdate({_id: db.getPrimaryKey(todoID)}, {$set: {todo: userInput.todo}}, {returnOriginal: false}, (err, result) => {
        if(err) {
            console.log(err);
        } else {
            res.json(result);
        }
    });
});

app.post("/", (req, res) => {
    const userInput = req.body;

    db.getDB().collection(collection).insertOne(userInput, (err, result) => {
        if(err) {
            console.log(err);
        } else {
            res.json({
                result: result, document: result.ops[0]
            });
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