// this file is used to define schema / structure of database
var mongoose = require("mongoose");
//used to connect expresss application to mongobd , it provide schema named class to define table structure.

const Schema = mongoose.Schema;
var State = new Schema(
  {
    stid: { type: Number },
    stname: { type: String },
    status: { type: Number },
  },
  {
    collection: "state",
    //collection means table , it will create state named collection or table in mongodb database
  }
);
module.exports = mongoose.model("State", State);
