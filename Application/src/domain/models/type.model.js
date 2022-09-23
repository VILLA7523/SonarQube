const express = require("express");
const router = express.Router();
const connectionDb = require("../../config/dbconnections");

class TypeModel {
  async getAll() {
    const con = connectionDb.promise();
    const data = await con.query("SELECT * FROM type");
    return data[0];
  }
}

module.exports = TypeModel;
