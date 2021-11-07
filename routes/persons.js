const express = require("express");
const personsRouter = express.Router();
const fsAsync = require("fs/promises");
const path = require("path");
const util = require("util");


personsRouter.get("/" , async (req ,res) => {
    //const fileData = (await fsAsync.readFile("./data/data.json")).toString()
    fileRoot = __dirname.split("routes")[0]
    res.sendFile(`${fileRoot}/data/data.json`)
}) 

module.exports = personsRouter