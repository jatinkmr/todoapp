const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const ports = require('./port.js');
const db = require("./db");

const collection = "todo";

app.use(app.use(bodyParser.json()));

app.listen(ports.port, () => {
    console.log(`Server started at ${ports.port}`);
});