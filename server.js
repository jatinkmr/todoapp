const express = require("express");
const app = express();
const ports = require('./port.js');

app.listen(ports.port, () => {
    console.log(`Server started at ${ports.port}`);
});