const express= require("express")
const infoRouter = express.Router()
const moment = require("moment")
const fsAsync = require("fs/promises");

module.exports = infoRouter

async function amountPeople() {
    const fileRoot = __dirname.split("routes")[0]
    const fileData = JSON.parse(await fsAsync.readFile(`${fileRoot}/data/data.json`))
    let amount =0;
    for (let obj in fileData) {
        amount+=1;
    }
    return amount;

}

infoRouter.get("/" , async (req ,res) => {
    const time = moment().format("dddd,MMMM Do YYYY, h:mm:ss a")
    res.send(`phonebook has info for ${await amountPeople()} people ${time}`)
})